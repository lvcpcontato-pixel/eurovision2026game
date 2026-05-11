'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createClient } from '@/lib/supabase/client'
import { GripVertical, Plus, X, Trophy } from 'lucide-react'

interface Country {
  id: number
  name: string
  code: string
  flag_emoji: string
  semifinal: number | null
  is_direct_finalist: boolean
}

interface FinalPredictionWithCountry {
  country_id: number
  position: number
  countries: Country
}

interface RankedCountry {
  id: number
  name: string
  code: string
  flag_emoji: string
}

function getMedalStyle(pos: number): { backgroundColor: string; border: string; color: string } {
  if (pos === 1) return { backgroundColor: 'rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.4)', color: '#fbbf24' }
  if (pos === 2) return { backgroundColor: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', color: '#e2e8f0' }
  if (pos === 3) return { backgroundColor: 'rgba(180, 83, 9, 0.2)', border: '1px solid rgba(180, 83, 9, 0.4)', color: '#d97706' }
  return { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
}

function SortableItem({ country, position, onRemove }: { country: RankedCountry; position: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: country.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const medalStyle = getMedalStyle(position)

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: '#12122a', border: '1px solid #2a2a4a' }}
      className="flex items-center gap-3 rounded-xl p-3 group transition-colors"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none" style={{ color: '#4b5563' }}>
        <GripVertical size={16} />
      </div>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={medalStyle}>
        {position <= 3 ? ['🥇','🥈','🥉'][position-1] : position}
      </div>
      <span className="text-2xl flex-shrink-0">{country.flag_emoji}</span>
      <span className="flex-1 font-medium text-white text-sm">{country.name}</span>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-all"
        style={{ color: '#4b5563' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
        onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}
      >
        <X size={14} />
      </button>
    </div>
  )
}

interface Props {
  allCountries: Country[]
  initialPredictions: FinalPredictionWithCountry[]
  userId: string
}

export default function FinalPredictionsClient({ allCountries, initialPredictions, userId }: Props) {
  const supabase = createClient()

  const [ranked, setRanked] = useState<RankedCountry[]>(() =>
    initialPredictions.map(p => ({
      id: p.country_id,
      name: p.countries.name,
      code: p.countries.code,
      flag_emoji: p.countries.flag_emoji,
    }))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const rankedIds = new Set(ranked.map(c => c.id))
  const unranked = allCountries.filter(c => !rankedIds.has(c.id))

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

  function addCountry(country: Country) {
    const newRanked = [...ranked, { id: country.id, name: country.name, code: country.code, flag_emoji: country.flag_emoji }]
    setRanked(newRanked)
    savePredictions(newRanked)
  }

  function removeCountry(countryId: number) {
    const newRanked = ranked.filter(c => c.id !== countryId)
    setRanked(newRanked)
    savePredictions(newRanked)
  }

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">🏆 Grande Final</h1>
          <p style={{ color: '#9ca3af' }}>
            Arraste os países para montar seu ranking da Grande Final.
            <br />
            <span style={{ color: '#c4b5fd' }}>Adicione países do pool e ordene por drag-and-drop.</span>
          </p>
        </div>
        <div className="text-right ml-4">
          {saving && <span className="text-xs animate-pulse block" style={{ color: '#a78bfa' }}>Salvando...</span>}
          {saved && <span className="text-xs block" style={{ color: '#86efac' }}>✓ Salvo!</span>}
          <span className="text-sm font-bold" style={{ color: ranked.length >= 26 ? '#86efac' : '#9ca3af' }}>
            {ranked.length}/26
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranked list */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>
            Seu Ranking ({ranked.length}/26)
          </h2>
          {ranked.length === 0 ? (
            <div className="border-2 border-dashed rounded-2xl p-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#4b5563' }}>
              <Trophy size={32} className="mx-auto mb-2 opacity-30" />
              <p>Adicione países do pool ao lado →</p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={ranked.map(c => c.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                  {ranked.map((country, index) => (
                    <SortableItem
                      key={country.id}
                      country={country}
                      position={index + 1}
                      onRemove={() => removeCountry(country.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Country pool */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>
            Países Disponíveis ({unranked.length})
          </h2>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: '600px' }}>
            {unranked.length === 0 ? (
              <div className="border-2 border-dashed rounded-2xl p-6 text-center" style={{ borderColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac', backgroundColor: 'rgba(34, 197, 94, 0.05)' }}>
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm">Todos os países foram ranqueados!</p>
              </div>
            ) : (
              unranked.map(country => (
                <button
                  key={country.id}
                  onClick={() => addCountry(country)}
                  className="flex items-center gap-3 rounded-xl p-3 group transition-all text-left"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
                >
                  <span className="text-xl">{country.flag_emoji}</span>
                  <span className="flex-1 text-sm font-medium" style={{ color: '#d1d5db' }}>{country.name}</span>
                  {country.is_direct_finalist && (
                    <span className="text-xs rounded-full px-2 py-0.5" style={{ color: '#d97706', backgroundColor: 'rgba(180, 83, 9, 0.1)', border: '1px solid rgba(180, 83, 9, 0.2)' }}>Big 5+</span>
                  )}
                  {country.semifinal && (
                    <span className="text-xs rounded-full px-2 py-0.5" style={{ color: '#a78bfa', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>SF{country.semifinal}</span>
                  )}
                  <Plus size={14} style={{ color: '#4b5563' }} />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
