'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, Info } from 'lucide-react'

interface Country {
  id: number
  name: string
  code: string
  flag_emoji: string
  semifinal: number | null
  is_direct_finalist: boolean
}

interface Prediction {
  semifinal: number
  country_id: number
}

interface Props {
  countries: Country[]
  initialPredictions: Prediction[]
  userId: string
}

export default function SemifinalsClient({ countries, initialPredictions, userId }: Props) {
  const supabase = createClient()
  const [selectedSemi, setSelectedSemi] = useState(1)
  const [predictions, setPredictions] = useState<Set<string>>(
    new Set(initialPredictions.map(p => `${p.semifinal}-${p.country_id}`))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const semi1Countries = countries.filter(c => c.semifinal === 1)
  const semi2Countries = countries.filter(c => c.semifinal === 2)
  const currentCountries = selectedSemi === 1 ? semi1Countries : semi2Countries
  const currentSelected = currentCountries.filter(c => predictions.has(`${selectedSemi}-${c.id}`))

  async function toggleCountry(countryId: number) {
    const key = `${selectedSemi}-${countryId}`
    const isSelected = predictions.has(key)
    const count = currentCountries.filter(c => predictions.has(`${selectedSemi}-${c.id}`)).length

    if (!isSelected && count >= 10) return

    const newPredictions = new Set(predictions)
    if (isSelected) {
      newPredictions.delete(key)
    } else {
      newPredictions.add(key)
    }
    setPredictions(newPredictions)

    setSaving(true)
    setSaved(false)
    try {
      if (isSelected) {
        await supabase
          .from('semifinal_predictions')
          .delete()
          .eq('user_id', userId)
          .eq('semifinal', selectedSemi)
          .eq('country_id', countryId)
      } else {
        await supabase
          .from('semifinal_predictions')
          .upsert({ user_id: userId, semifinal: selectedSemi, country_id: countryId })
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8" style={{ maxWidth: '768px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">🎵 Semifinais</h1>
        <p style={{ color: '#9ca3af' }}>Escolha os <strong className="text-white">10 países</strong> que você acha que vão se classificar de cada semifinal.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        {[1, 2].map(semi => {
          const count = (semi === 1 ? semi1Countries : semi2Countries)
            .filter(c => predictions.has(`${semi}-${c.id}`)).length
          return (
            <button
              key={semi}
              onClick={() => setSelectedSemi(semi)}
              className="flex-1 py-3 px-4 rounded-xl font-bold transition-all"
              style={selectedSemi === semi
                ? { backgroundColor: '#7c3aed', color: 'white' }
                : { backgroundColor: cardBg, border: `1px solid ${borderColor}`, color: '#9ca3af' }
              }
            >
              Semifinal {semi}
              <span className="ml-2 text-sm rounded-full px-2 py-0.5" style={count >= 10
                ? { backgroundColor: 'rgba(34, 197, 94, 0.3)', color: '#86efac' }
                : { backgroundColor: 'rgba(255,255,255,0.1)', color: '#9ca3af' }
              }>
                {count}/10
              </span>
            </button>
          )
        })}
      </div>

      {/* Selection counter + tip */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
          <Info size={14} />
          <span>Selecione exatamente 10 países</span>
        </div>
        {saving && <span className="text-xs animate-pulse" style={{ color: '#a78bfa' }}>Salvando...</span>}
        {saved && <span className="text-xs" style={{ color: '#86efac' }}>✓ Salvo!</span>}
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {currentCountries.map(country => {
          const isSelected = predictions.has(`${selectedSemi}-${country.id}`)
          const count = currentCountries.filter(c => predictions.has(`${selectedSemi}-${c.id}`)).length
          const isDisabled = !isSelected && count >= 10

          return (
            <button
              key={country.id}
              onClick={() => toggleCountry(country.id)}
              disabled={isDisabled}
              className="relative flex flex-col items-center gap-2 p-4 rounded-2xl font-medium transition-all duration-150"
              style={
                isSelected
                  ? { backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '2px solid #8B5CF6', color: 'white', transform: 'scale(1.05)' }
                  : isDisabled
                  ? { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#4b5563', opacity: 0.4, cursor: 'not-allowed' }
                  : { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#d1d5db' }
              }
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7c3aed' }}>
                  <Check size={12} className="text-white" />
                </div>
              )}
              <span className="text-3xl">{country.flag_emoji}</span>
              <span className="text-sm text-center leading-tight">{country.name}</span>
            </button>
          )
        })}
      </div>

      {/* Selected countries summary */}
      {currentSelected.length > 0 && (
        <div className="rounded-2xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="text-sm font-semibold text-white mb-3">
            Seus classificados para a Final ({currentSelected.length}/10):
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSelected.map(c => (
              <span key={c.id} className="rounded-full px-3 py-1 text-sm" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#c4b5fd' }}>
                {c.flag_emoji} {c.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
