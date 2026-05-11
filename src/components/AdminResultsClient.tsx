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
import { Check, GripVertical, Plus, X, Trophy, Save } from 'lucide-react'

interface Country {
  id: number; name: string; code: string; flag_emoji: string
  semifinal: number | null; is_direct_finalist: boolean
}
interface Result {
  result_type: string; country_id: number; qualified?: boolean; position?: number
}
interface RankedCountry {
  id: number; name: string; flag_emoji: string
}

function SortableItem({ country, position, onRemove }: { country: RankedCountry; position: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: country.id })
  const medalStyle = position === 1
    ? { backgroundColor: 'rgba(234,179,8,0.2)', border: '1px solid rgba(234,179,8,0.4)', color: '#fbbf24' }
    : position === 2 ? { backgroundColor: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.3)', color: '#e2e8f0' }
    : position === 3 ? { backgroundColor: 'rgba(180,83,9,0.2)', border: '1px solid rgba(180,83,9,0.4)', color: '#d97706' }
    : { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, backgroundColor: '#12122a', border: '1px solid #2a2a4a' }} className="flex items-center gap-3 rounded-xl p-3 group">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none" style={{ color: '#4b5563' }}><GripVertical size={16} /></div>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={medalStyle}>
        {position <= 3 ? ['🥇','🥈','🥉'][position-1] : position}
      </div>
      <span className="text-2xl flex-shrink-0">{country.flag_emoji}</span>
      <span className="flex-1 font-medium text-white text-sm">{country.name}</span>
      <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 transition-all" style={{ color: '#4b5563' }}><X size={14} /></button>
    </div>
  )
}

export default function AdminResultsClient({ countries, initialResults, userId }: { countries: Country[]; initialResults: Result[]; userId: string }) {
  const supabase = createClient()
  const [tab, setTab] = useState<'sf1' | 'sf2' | 'final'>('sf1')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)

  // SF qualified sets
  const [sf1Qualified, setSf1Qualified] = useState<Set<number>>(
    new Set(initialResults.filter(r => r.result_type === 'semifinal1' && r.qualified).map(r => r.country_id))
  )
  const [sf2Qualified, setSf2Qualified] = useState<Set<number>>(
    new Set(initialResults.filter(r => r.result_type === 'semifinal2' && r.qualified).map(r => r.country_id))
  )

  // Final ranked list
  const [finalRanked, setFinalRanked] = useState<RankedCountry[]>(() => {
    const finalResults = initialResults.filter(r => r.result_type === 'final').sort((a, b) => (a.position || 0) - (b.position || 0))
    return finalResults.map(r => {
      const c = countries.find(c => c.id === r.country_id)
      return c ? { id: c.id, name: c.name, flag_emoji: c.flag_emoji } : null
    }).filter(Boolean) as RankedCountry[]
  })

  const sf1Countries = countries.filter(c => c.semifinal === 1)
  const sf2Countries = countries.filter(c => c.semifinal === 2)
  const rankedIds = new Set(finalRanked.map(c => c.id))
  const finalPool = countries.filter(c => !rankedIds.has(c.id))

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  function toggleSF(semi: 1 | 2, countryId: number) {
    const set = semi === 1 ? new Set(sf1Qualified) : new Set(sf2Qualified)
    const setter = semi === 1 ? setSf1Qualified : setSf2Qualified
    if (set.has(countryId)) { set.delete(countryId) } else if (set.size < 10) { set.add(countryId) }
    setter(set)
  }

  async function saveSF(semi: 1 | 2) {
    setSaving(true); setSaved(null)
    const type = semi === 1 ? 'semifinal1' : 'semifinal2'
    const qualified = semi === 1 ? sf1Qualified : sf2Qualified
    const semiCountries = semi === 1 ? sf1Countries : sf2Countries
    try {
      await supabase.from('actual_results').delete().eq('result_type', type)
      if (qualified.size > 0) {
        await supabase.from('actual_results').insert(
          semiCountries.map(c => ({ result_type: type, country_id: c.id, qualified: qualified.has(c.id) }))
        )
      }
      setSaved(`sf${semi}`)
      setTimeout(() => setSaved(null), 3000)
    } finally { setSaving(false) }
  }

  async function saveFinal() {
    setSaving(true); setSaved(null)
    try {
      await supabase.from('actual_results').delete().eq('result_type', 'final')
      if (finalRanked.length > 0) {
        await supabase.from('actual_results').insert(
          finalRanked.map((c, i) => ({ result_type: 'final', country_id: c.id, position: i + 1, qualified: true }))
        )
      }
      setSaved('final')
      setTimeout(() => setSaved(null), 3000)
    } finally { setSaving(false) }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = finalRanked.findIndex(c => c.id === active.id)
      const newIndex = finalRanked.findIndex(c => c.id === over.id)
      setFinalRanked(arrayMove(finalRanked, oldIndex, newIndex))
    }
  }

  const cardBg = '#12122a'; const borderColor = '#2a2a4a'

  const tabs = [
    { key: 'sf1' as const, label: 'Semifinal 1', count: sf1Qualified.size },
    { key: 'sf2' as const, label: 'Semifinal 2', count: sf2Qualified.size },
    { key: 'final' as const, label: 'Grande Final', count: finalRanked.length },
  ]

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-3" style={{ backgroundColor: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
          🔐 ÁREA DO ADMIN
        </div>
        <h1 className="text-3xl font-black text-white mb-1">⚡ Resultados Reais</h1>
        <p style={{ color: '#9ca3af' }}>Insira os resultados oficiais do Eurovision 2026. O ranking atualiza automaticamente para todos.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className="flex-1 py-3 px-3 rounded-xl font-bold transition-all text-sm" style={tab === t.key ? { backgroundColor: '#dc2626', color: 'white' } : { backgroundColor: cardBg, border: `1px solid ${borderColor}`, color: '#9ca3af' }}>
            {t.label}
            <span className="ml-2 text-xs rounded-full px-2 py-0.5" style={t.count >= (t.key === 'final' ? 25 : 10) ? { backgroundColor: 'rgba(34,197,94,0.3)', color: '#86efac' } : { backgroundColor: 'rgba(255,255,255,0.1)', color: '#9ca3af' }}>
              {t.count}/{t.key === 'final' ? 25 : 10}
            </span>
          </button>
        ))}
      </div>

      {/* SF1 */}
      {(tab === 'sf1' || tab === 'sf2') && (() => {
        const semi = tab === 'sf1' ? 1 : 2
        const qualified = tab === 'sf1' ? sf1Qualified : sf2Qualified
        const semiCountries = tab === 'sf1' ? sf1Countries : sf2Countries
        return (
          <div>
            <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>Clique nos <strong className="text-white">10 países</strong> que se classificaram desta semifinal.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {semiCountries.map(country => {
                const isSelected = qualified.has(country.id)
                const isDisabled = !isSelected && qualified.size >= 10
                return (
                  <button key={country.id} onClick={() => toggleSF(semi, country.id)} disabled={isDisabled} className="relative flex flex-col items-center gap-2 p-4 rounded-2xl font-medium transition-all duration-150" style={isSelected ? { backgroundColor: 'rgba(220,38,38,0.2)', border: '2px solid #dc2626', color: 'white', transform: 'scale(1.05)' } : isDisabled ? { backgroundColor: cardBg, border: `2px solid ${borderColor}`, opacity: 0.4, cursor: 'not-allowed', color: '#4b5563' } : { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#d1d5db' }}>
                    {isSelected && <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dc2626' }}><Check size={12} className="text-white" /></div>}
                    <span className="text-3xl">{country.flag_emoji}</span>
                    <span className="text-sm text-center leading-tight">{country.name}</span>
                  </button>
                )
              })}
            </div>
            {qualified.size > 0 && (
              <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                <div className="text-sm font-semibold text-white mb-2">Classificados ({qualified.size}/10):</div>
                <div className="flex flex-wrap gap-2">
                  {semiCountries.filter(c => qualified.has(c.id)).map(c => (
                    <span key={c.id} className="rounded-full px-3 py-1 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5' }}>{c.flag_emoji} {c.name}</span>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => saveSF(semi)} disabled={saving || qualified.size === 0} className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all" style={{ backgroundColor: qualified.size === 10 ? '#dc2626' : '#4b5563', color: 'white', opacity: saving ? 0.7 : 1 }}>
              <Save size={16} />
              {saving ? 'Salvando...' : saved === `sf${semi}` ? '✓ Salvo!' : `Salvar Resultados da ${tab === 'sf1' ? 'SF1' : 'SF2'}`}
            </button>
          </div>
        )
      })()}

      {/* Final */}
      {tab === 'final' && (
        <div>
          <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>Monte o ranking final oficial arrastando os países. Adicione do pool ao lado.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>Ranking Oficial ({finalRanked.length}/25)</h2>
              {finalRanked.length === 0 ? (
                <div className="border-2 border-dashed rounded-2xl p-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#4b5563' }}>
                  <Trophy size={32} className="mx-auto mb-2 opacity-30" />
                  <p>Adicione países do pool →</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={finalRanked.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col gap-2">
                      {finalRanked.map((country, index) => (
                        <SortableItem key={country.id} country={country} position={index + 1} onRemove={() => setFinalRanked(finalRanked.filter(c => c.id !== country.id))} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>Países Disponíveis ({finalPool.length})</h2>
              <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: '500px' }}>
                {finalPool.length === 0 ? (
                  <div className="border-2 border-dashed rounded-2xl p-6 text-center" style={{ borderColor: 'rgba(34,197,94,0.2)', color: '#86efac', backgroundColor: 'rgba(34,197,94,0.05)' }}>
                    <div className="text-2xl mb-2">✅</div>
                    <p className="text-sm">Todos os países foram ranqueados!</p>
                  </div>
                ) : (
                  finalPool.map(country => (
                    <button key={country.id} onClick={() => setFinalRanked([...finalRanked, { id: country.id, name: country.name, flag_emoji: country.flag_emoji }])} className="flex items-center gap-3 rounded-xl p-3 text-left transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                      <span className="text-xl">{country.flag_emoji}</span>
                      <span className="flex-1 text-sm font-medium" style={{ color: '#d1d5db' }}>{country.name}</span>
                      {country.is_direct_finalist && <span className="text-xs rounded-full px-2 py-0.5" style={{ color: '#d97706', backgroundColor: 'rgba(180,83,9,0.1)', border: '1px solid rgba(180,83,9,0.2)' }}>Direto</span>}
                      {country.semifinal && <span className="text-xs rounded-full px-2 py-0.5" style={{ color: '#a78bfa', backgroundColor: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>SF{country.semifinal}</span>}
                      <Plus size={14} style={{ color: '#4b5563' }} />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          <button onClick={saveFinal} disabled={saving || finalRanked.length === 0} className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all" style={{ backgroundColor: finalRanked.length === 25 ? '#dc2626' : '#4b5563', color: 'white', opacity: saving ? 0.7 : 1 }}>
            <Save size={16} />
            {saving ? 'Salvando...' : saved === 'final' ? '✓ Ranking salvo! Leaderboard atualizado!' : 'Salvar Ranking da Final'}
          </button>
        </div>
      )}
    </main>
  )
}
