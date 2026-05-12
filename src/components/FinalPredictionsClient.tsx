'use client'

import { useState } from 'react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { GripVertical, AlertCircle, ArrowRight } from 'lucide-react'

interface RankedCountry {
  id: number
  name: string
  flag_emoji: string
}

function getMedalStyle(pos: number) {
  if (pos === 1) return { backgroundColor: 'rgba(234,179,8,0.2)', border: '1px solid rgba(234,179,8,0.4)', color: '#fbbf24' }
  if (pos === 2) return { backgroundColor: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.3)', color: '#e2e8f0' }
  if (pos === 3) return { backgroundColor: 'rgba(180,83,9,0.2)', border: '1px solid rgba(180,83,9,0.4)', color: '#d97706' }
  return { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
}

function SortableItem({ country, position }: { country: RankedCountry; position: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: country.id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, backgroundColor: '#12122a', border: '1px solid #2a2a4a' }}
      className="flex items-center gap-3 rounded-xl p-3"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none" style={{ color: '#4b5563' }}>
        <GripVertical size={16} />
      </div>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={getMedalStyle(position)}>
        {position <= 3 ? ['🥇', '🥈', '🥉'][position - 1] : position}
      </div>
      <span className="text-2xl flex-shrink-0">{country.flag_emoji}</span>
      <span className="flex-1 font-medium text-white text-sm">{country.name}</span>
    </div>
  )
}

interface Props {
  eligibleCountries: RankedCountry[]
  initialPredictions: { country_id: number; position: number }[]
  userId: string
  sf1Count: number
  sf2Count: number
}

export default function FinalPredictionsClient({ eligibleCountries, initialPredictions, userId, sf1Count, sf2Count }: Props) {
  const sf1Complete = sf1Count >= 10
  const sf2Complete = sf2Count >= 10
  const semisComplete = sf1Complete && sf2Complete
  const supabase = createClient()

  const [ranked, setRanked] = useState<RankedCountry[]>(() => {
    if (initialPredictions.length > 0) {
      return initialPredictions
        .sort((a, b) => a.position - b.position)
        .map(p => eligibleCountries.find(c => c.id === p.country_id))
        .filter(Boolean) as RankedCountry[]
    }
    return eligibleCountries
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function savePredictions(newRanked: RankedCountry[]) {
    setSaving(true)
    setSaved(false)
    try {
      await supabase.from('final_predictions').delete().eq('user_id', userId)
      if (newRanked.length > 0) {
        await supabase.from('final_predictions').insert(
          newRanked.map((c, i) => ({ user_id: userId, country_id: c.id, position: i + 1 }))
        )
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = ranked.findIndex(c => c.id === active.id)
      const newIndex = ranked.findIndex(c => c.id === over.id)
      const newRanked = arrayMove(ranked, oldIndex, newIndex)
      setRanked(newRanked)
      savePredictions(newRanked)
    }
  }

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">🏆 Grande Final</h1>
          <p style={{ color: '#9ca3af' }}>
            Arraste os países para definir seu ranking. A lista inclui seus classificados das semifinais + Big 5 e Áustria.
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          {saving && <span className="text-xs animate-pulse block" style={{ color: '#a78bfa' }}>Salvando...</span>}
          {saved && <span className="text-xs block" style={{ color: '#86efac' }}>✓ Salvo!</span>}
          <span className="text-sm font-bold" style={{ color: '#9ca3af' }}>{ranked.length} países</span>
        </div>
      </div>

      {/* Warning if semifinals incomplete */}
      {!semisComplete && (
        <div className="rounded-2xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
          <div className="flex-1">
            <p className="font-semibold text-white text-sm mb-1">Semifinais incompletas</p>
            <p className="text-xs mb-2" style={{ color: '#d1d5db' }}>
              Complete as semifinais para ver o ranking com todos os seus classificados.
            </p>
            <div className="flex gap-3 text-xs mb-3">
              <span style={{ color: sf1Complete ? '#86efac' : '#fbbf24' }}>
                {sf1Complete ? '✓' : '⚠'} SF1: {sf1Count}/10
              </span>
              <span style={{ color: sf2Complete ? '#86efac' : '#fbbf24' }}>
                {sf2Complete ? '✓' : '⚠'} SF2: {sf2Count}/10
              </span>
            </div>
            <Link href="/predictions/semifinals" className="inline-flex items-center gap-1 text-xs font-bold rounded-lg px-3 py-1.5" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.4)' }}>
              Completar semifinais <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ranked.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {ranked.map((country, index) => (
              <SortableItem key={country.id} country={country} position={index + 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  )
}
