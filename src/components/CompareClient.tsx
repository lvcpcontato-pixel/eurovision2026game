'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

interface Profile {
  id: string
  full_name?: string
  username?: string
  avatar_url?: string
}

interface Country {
  id: number
  name: string
  flag_emoji: string
  semifinal: number | null
  is_direct_finalist: boolean
}

interface SFPred { semifinal: number; country_id: number }
interface FinalPred { country_id: number; position: number }

interface Props {
  currentUser: Profile
  otherUsers: Profile[]
  mySFPredictions: SFPred[]
  myFinalPredictions: FinalPred[]
  userId: string
  countries: Country[]
}

export default function CompareClient({ otherUsers, mySFPredictions, myFinalPredictions, countries }: Props) {
  const supabase = createClient()
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [theirSF, setTheirSF] = useState<SFPred[]>([])
  const [theirFinal, setTheirFinal] = useState<FinalPred[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ sf1: true, sf2: true, final: true })

  async function selectUser(user: Profile) {
    setSelectedUser(user)
    setLoading(true)
    const [sfRes, finalRes] = await Promise.all([
      supabase.from('semifinal_predictions').select('*').eq('user_id', user.id),
      supabase.from('final_predictions').select('*').eq('user_id', user.id),
    ])
    setTheirSF(sfRes.data || [])
    setTheirFinal(finalRes.data || [])
    setLoading(false)
  }

  function toggleSection(key: string) {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function getSFData(semi: number) {
    const semiCountries = countries.filter(c => c.semifinal === semi)
    const mine = new Set(mySFPredictions.filter(p => p.semifinal === semi).map(p => p.country_id))
    const theirs = new Set(theirSF.filter(p => p.semifinal === semi).map(p => p.country_id))
    const both = semiCountries.filter(c => mine.has(c.id) && theirs.has(c.id))
    const onlyMe = semiCountries.filter(c => mine.has(c.id) && !theirs.has(c.id))
    const onlyThem = semiCountries.filter(c => !mine.has(c.id) && theirs.has(c.id))
    const matchCount = both.length
    const total = Math.max(mine.size, theirs.size, 10)
    return { both, onlyMe, onlyThem, matchCount, total }
  }

  function getFinalData() {
    const myMap = new Map(myFinalPredictions.map(p => [p.country_id, p.position]))
    const theirMap = new Map(theirFinal.map(p => [p.country_id, p.position]))
    const allIds = new Set([...myMap.keys(), ...theirMap.keys()])
    const rows = Array.from(allIds).map(id => {
      const country = countries.find(c => c.id === id)
      const myPos = myMap.get(id)
      const theirPos = theirMap.get(id)
      return { country, myPos, theirPos }
    }).filter(r => r.country && r.myPos !== undefined)
    rows.sort((a, b) => (a.myPos ?? 99) - (b.myPos ?? 99))
    const exactMatch = rows.filter(r => r.myPos !== undefined && r.theirPos !== undefined && r.myPos === r.theirPos).length
    const closeMatch = rows.filter(r => r.myPos !== undefined && r.theirPos !== undefined && r.myPos !== r.theirPos && Math.abs(r.myPos - r.theirPos) <= 3).length
    return { rows, exactMatch, closeMatch, total: rows.length }
  }

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  const sf1Data = selectedUser && !loading ? getSFData(1) : null
  const sf2Data = selectedUser && !loading ? getSFData(2) : null
  const finalData = selectedUser && !loading ? getFinalData() : null

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">👥 Comparar</h1>
        <p style={{ color: '#9ca3af' }}>Veja onde você e seus amigos concordam (e discordam) nos palpites.</p>
      </div>

      {otherUsers.length === 0 ? (
        <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
          <Users size={40} className="mx-auto mb-3" style={{ color: '#4b5563' }} />
          <p className="font-medium" style={{ color: '#9ca3af' }}>Nenhum amigo cadastrado ainda.</p>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Convide seus amigos para participar!</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>Comparar com:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {otherUsers.map(u => (
                <button key={u.id} onClick={() => selectUser(u)} className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
                  style={selectedUser?.id === u.id
                    ? { borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', color: 'white' }
                    : { borderColor, backgroundColor: cardBg, color: '#9ca3af' }}>
                  {u.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={u.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: '#0e7490' }}>
                      {(u.full_name || u.username || '?')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-center leading-tight text-white">{u.full_name || u.username || 'Usuário'}</span>
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#8b5cf6', borderTopColor: 'transparent' }} />
            </div>
          )}

          {selectedUser && !loading && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} style={{ color: '#06b6d4' }} />
                vs {selectedUser.full_name || selectedUser.username}
              </h2>

              {/* SF1 */}
              {sf1Data && <SFSection label="🎵 Semifinal 1" data={sf1Data} expanded={expandedSections.sf1} onToggle={() => toggleSection('sf1')} selectedUserName={selectedUser.full_name || selectedUser.username || 'eles'} cardBg={cardBg} borderColor={borderColor} />}

              {/* SF2 */}
              {sf2Data && <SFSection label="🎵 Semifinal 2" data={sf2Data} expanded={expandedSections.sf2} onToggle={() => toggleSection('sf2')} selectedUserName={selectedUser.full_name || selectedUser.username || 'eles'} cardBg={cardBg} borderColor={borderColor} />}

              {/* Final */}
              {finalData && (
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                  <button onClick={() => toggleSection('final')} className="w-full flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">🏆 Grande Final</span>
                      <span className="text-xs rounded-full px-2 py-0.5" style={{ backgroundColor: 'rgba(139,92,246,0.2)', color: '#c4b5fd' }}>
                        {finalData.exactMatch} exatas · {finalData.closeMatch} próximas
                      </span>
                    </div>
                    {expandedSections.final ? <ChevronUp size={16} style={{ color: '#6b7280' }} /> : <ChevronDown size={16} style={{ color: '#6b7280' }} />}
                  </button>

                  {expandedSections.final && finalData.total > 0 && (
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-3 text-xs font-semibold mb-2 px-1" style={{ color: '#6b7280' }}>
                        <span>País</span>
                        <span className="text-center">Minha pos.</span>
                        <span className="text-center">Pos. deles</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {finalData.rows.map(({ country, myPos, theirPos }) => {
                          const diff = myPos !== undefined && theirPos !== undefined ? Math.abs(myPos - theirPos) : null
                          const isExact = diff === 0
                          const isClose = diff !== null && diff > 0 && diff <= 3
                          return (
                            <div key={country!.id} className="grid grid-cols-3 items-center rounded-lg px-2 py-2 text-sm"
                              style={{ backgroundColor: isExact ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)' }}>
                              <span className="flex items-center gap-2 text-white font-medium">
                                <span>{country!.flag_emoji}</span>
                                <span className="text-xs truncate" style={{ color: '#d1d5db' }}>{country!.name}</span>
                              </span>
                              <span className="text-center font-bold" style={{ color: '#a78bfa' }}>#{myPos}</span>
                              <span className="text-center">
                                {theirPos !== undefined ? (
                                  <span className="font-bold" style={{ color: isExact ? '#4ade80' : isClose ? '#facc15' : '#9ca3af' }}>
                                    #{theirPos}
                                    {isExact && ' ✓'}
                                  </span>
                                ) : (
                                  <span style={{ color: '#4b5563' }}>–</span>
                                )}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {expandedSections.final && finalData.total === 0 && (
                    <p className="px-4 pb-4 text-xs" style={{ color: '#4b5563' }}>Um de vocês ainda não fez seu ranking da final.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </main>
  )
}

function SFSection({ label, data, expanded, onToggle, selectedUserName, cardBg, borderColor }: {
  label: string
  data: { both: Country[]; onlyMe: Country[]; onlyThem: Country[]; matchCount: number; total: number }
  expanded: boolean
  onToggle: () => void
  selectedUserName: string
  cardBg: string
  borderColor: string
}) {
  const pct = Math.round((data.matchCount / data.total) * 100)
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{label}</span>
          <span className="text-xs rounded-full px-2 py-0.5" style={{ backgroundColor: 'rgba(6,182,212,0.15)', color: '#67e8f9' }}>
            {data.matchCount}/10 em comum
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#facc15' : '#9ca3af' }}>{pct}%</span>
          {expanded ? <ChevronUp size={16} style={{ color: '#6b7280' }} /> : <ChevronDown size={16} style={{ color: '#6b7280' }} />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {data.both.length > 0 && (
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#4ade80' }}>✅ Os dois escolheram ({data.both.length})</div>
              <div className="flex flex-wrap gap-2">
                {data.both.map(c => (
                  <span key={c.id} className="text-sm rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#86efac' }}>
                    {c.flag_emoji} {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.onlyMe.length > 0 && (
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#f87171' }}>🔴 Só eu escolhi ({data.onlyMe.length})</div>
              <div className="flex flex-wrap gap-2">
                {data.onlyMe.map(c => (
                  <span key={c.id} className="text-sm rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                    {c.flag_emoji} {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.onlyThem.length > 0 && (
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#60a5fa' }}>🔵 Só {selectedUserName} escolheu ({data.onlyThem.length})</div>
              <div className="flex flex-wrap gap-2">
                {data.onlyThem.map(c => (
                  <span key={c.id} className="text-sm rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }}>
                    {c.flag_emoji} {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.both.length === 0 && data.onlyMe.length === 0 && data.onlyThem.length === 0 && (
            <p className="text-xs" style={{ color: '#4b5563' }}>Nenhum de vocês fez palpites para esta semifinal ainda.</p>
          )}
        </div>
      )}
    </div>
  )
}
