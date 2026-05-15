'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, Info, Lock, Play, X } from 'lucide-react'

interface Country {
  id: number
  name: string
  code: string
  flag_emoji: string
  semifinal: number | null
  is_direct_finalist: boolean
  youtube_video_id?: string
}

interface Prediction {
  semifinal: number
  country_id: number
}

interface Props {
  countries: Country[]
  initialPredictions: Prediction[]
  userId: string
  sf1Locked?: boolean
  sf2Locked?: boolean
}

export default function SemifinalsClient({ countries, initialPredictions, userId, sf1Locked = false, sf2Locked = false }: Props) {
  const supabase = createClient()
  const [selectedSemi, setSelectedSemi] = useState(1)
  const [predictions, setPredictions] = useState<Set<string>>(
    new Set(initialPredictions.map(p => `${p.semifinal}-${p.country_id}`))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null)

  const semi1Countries = countries.filter(c => c.semifinal === 1)
  const semi2Countries = countries.filter(c => c.semifinal === 2)
  const currentCountries = selectedSemi === 1 ? semi1Countries : semi2Countries
  const currentSelected = currentCountries.filter(c => predictions.has(`${selectedSemi}-${c.id}`))
  const isCurrentLocked = selectedSemi === 1 ? sf1Locked : sf2Locked

  async function toggleCountry(countryId: number) {
    if (isCurrentLocked) return
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
          const locked = semi === 1 ? sf1Locked : sf2Locked
          const count = (semi === 1 ? semi1Countries : semi2Countries)
            .filter(c => predictions.has(`${semi}-${c.id}`)).length
          return (
            <button
              key={semi}
              onClick={() => setSelectedSemi(semi)}
              className="flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              style={selectedSemi === semi
                ? { backgroundColor: locked ? '#374151' : '#7c3aed', color: 'white' }
                : { backgroundColor: cardBg, border: `1px solid ${borderColor}`, color: '#9ca3af' }
              }
            >
              {locked && <Lock size={12} />}
              Semifinal {semi}
              <span className="text-sm rounded-full px-2 py-0.5" style={
                locked
                  ? { backgroundColor: 'rgba(239,68,68,0.2)', color: '#fca5a5' }
                  : count >= 10
                  ? { backgroundColor: 'rgba(34, 197, 94, 0.3)', color: '#86efac' }
                  : { backgroundColor: 'rgba(255,255,255,0.1)', color: '#9ca3af' }
              }>
                {locked ? '🔒' : `${count}/10`}
              </span>
            </button>
          )
        })}
      </div>

      {/* Lock notice */}
      {isCurrentLocked && (
        <div className="rounded-2xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <Lock size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} />
          <div>
            <p className="font-semibold text-white text-sm mb-1">Palpites encerrados</p>
            <p className="text-xs" style={{ color: '#d1d5db' }}>
              Os resultados da Semifinal {selectedSemi} já foram revelados. Seus palpites foram registrados e a pontuação calculada.
            </p>
          </div>
        </div>
      )}

      {/* Selection counter + tip */}
      {!isCurrentLocked && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
            <Info size={14} />
            <span>Selecione exatamente 10 países</span>
          </div>
          {saving && <span className="text-xs animate-pulse" style={{ color: '#a78bfa' }}>Salvando...</span>}
          {saved && <span className="text-xs" style={{ color: '#86efac' }}>✓ Salvo!</span>}
        </div>
      )}

      {/* Country grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {currentCountries.map(country => {
          const isSelected = predictions.has(`${selectedSemi}-${country.id}`)
          const count = currentCountries.filter(c => predictions.has(`${selectedSemi}-${c.id}`)).length
          const isDisabled = isCurrentLocked || (!isSelected && count >= 10)

          return (
            <div key={country.id} className="relative">
              <button
                onClick={() => toggleCountry(country.id)}
                disabled={isDisabled}
                className="relative w-full flex flex-col items-center gap-2 p-4 rounded-2xl font-medium transition-all duration-150"
                style={
                  isCurrentLocked && isSelected
                    ? { backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '2px solid rgba(139,92,246,0.4)', color: 'white', cursor: 'default' }
                    : isCurrentLocked
                    ? { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#4b5563', opacity: 0.35, cursor: 'default' }
                    : isSelected
                    ? { backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '2px solid #8B5CF6', color: 'white', transform: 'scale(1.05)' }
                    : isDisabled
                    ? { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#4b5563', opacity: 0.4, cursor: 'not-allowed' }
                    : { backgroundColor: cardBg, border: `2px solid ${borderColor}`, color: '#d1d5db' }
                }
              >
                {isSelected && !isCurrentLocked && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7c3aed' }}>
                    <Check size={12} className="text-white" />
                  </div>
                )}
                {isSelected && isCurrentLocked && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(139,92,246,0.5)' }}>
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <span className="text-3xl">{country.flag_emoji}</span>
                <span className="text-sm text-center leading-tight">{country.name}</span>
              </button>
              {country.youtube_video_id && (
                <button
                  onClick={() => setVideoId(country.youtube_video_id!)}
                  className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all"
                  style={{ backgroundColor: 'rgba(220,38,38,0.85)', color: 'white' }}
                  title="Ouvir música"
                >
                  <Play size={10} fill="white" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected countries summary */}
      {currentSelected.length > 0 && (
        <div className="rounded-2xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="text-sm font-semibold text-white mb-3">
            {isCurrentLocked ? 'Seus palpites registrados:' : `Seus classificados para a Final (${currentSelected.length}/10):`}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSelected.map(c => (
              <button
                key={c.id}
                onClick={() => c.youtube_video_id && setVideoId(c.youtube_video_id)}
                className="flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-all"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#c4b5fd' }}
              >
                {c.flag_emoji} {c.name}
                {c.youtube_video_id && <Play size={10} fill="currentColor" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* YouTube player modal */}
      {videoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setVideoId(null)}
        >
          <div className="relative w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setVideoId(null)}
              className="absolute -top-10 right-0 flex items-center gap-1 text-white text-sm font-medium"
            >
              <X size={16} /> Fechar
            </button>
            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
