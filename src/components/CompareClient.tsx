'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, TrendingUp } from 'lucide-react'

interface Profile {
  id: string
  full_name?: string
  username?: string
  avatar_url?: string
}

interface SFPred {
  semifinal: number
  country_id: number
}

interface FinalPred {
  country_id: number
  position: number
}

interface Props {
  currentUser: Profile
  otherUsers: Profile[]
  mySFPredictions: SFPred[]
  myFinalPredictions: FinalPred[]
  userId: string
}

export default function CompareClient({
  otherUsers,
  mySFPredictions,
  myFinalPredictions,
  userId,
}: Props) {
  const supabase = createClient()
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [theirSF, setTheirSF] = useState<SFPred[]>([])
  const [theirFinal, setTheirFinal] = useState<FinalPred[]>([])
  const [loading, setLoading] = useState(false)

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

  function getSFMatchScore(semi: number): { match: number; total: number } {
    const mine = new Set(mySFPredictions.filter((p) => p.semifinal === semi).map((p) => p.country_id))
    const theirs = new Set(theirSF.filter((p) => p.semifinal === semi).map((p) => p.country_id))
    let match = 0
    mine.forEach((id) => {
      if (theirs.has(id)) match++
    })
    return { match, total: Math.max(mine.size, theirs.size, 10) }
  }

  function getFinalMatchScore(): { exactMatch: number; closeMatch: number; total: number } {
    let exact = 0
    let close = 0
    myFinalPredictions.forEach((mine) => {
      const theirs = theirFinal.find((f) => f.country_id === mine.country_id)
      if (!theirs) return
      const diff = Math.abs(mine.position - theirs.position)
      if (diff === 0) exact++
      else if (diff <= 3) close++
    })
    return {
      exactMatch: exact,
      closeMatch: close,
      total: Math.max(myFinalPredictions.length, theirFinal.length),
    }
  }

  const sf1Match = selectedUser ? getSFMatchScore(1) : null
  const sf2Match = selectedUser ? getSFMatchScore(2) : null
  const finalMatch = selectedUser ? getFinalMatchScore() : null

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <main className="px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">👥 Comparar</h1>
        <p style={{ color: '#9ca3af' }}>Veja como seus palpites se comparam aos dos seus amigos.</p>
      </div>

      {otherUsers.length === 0 ? (
        <div
          className="text-center py-16 rounded-2xl"
          style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
        >
          <Users size={40} className="mx-auto mb-3" style={{ color: '#4b5563' }} />
          <p className="font-medium" style={{ color: '#9ca3af' }}>
            Nenhum amigo cadastrado ainda.
          </p>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Convide seus amigos para participar!
          </p>
        </div>
      ) : (
        <>
          {/* User picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>
              Comparar com:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {otherUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => selectUser(u)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
                  style={
                    selectedUser?.id === u.id
                      ? { borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', color: 'white' }
                      : { borderColor: borderColor, backgroundColor: cardBg, color: '#9ca3af' }
                  }
                >
                  {u.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={u.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: '#0e7490' }}
                    >
                      {(u.full_name || u.username || '?')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-center leading-tight text-white">
                    {u.full_name || u.username || 'Usuário'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison results */}
          {loading && (
            <div className="text-center py-8">
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto"
                style={{ borderColor: '#8b5cf6', borderTopColor: 'transparent' }}
              />
            </div>
          )}

          {selectedUser && !loading && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} style={{ color: '#06b6d4' }} />
                Comparação com {selectedUser.full_name || selectedUser.username}
              </h2>

              {/* SF1 */}
              {sf1Match && (
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">🎵 Semifinal 1</span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        color:
                          sf1Match.match >= 7
                            ? '#4ade80'
                            : sf1Match.match >= 5
                            ? '#facc15'
                            : '#9ca3af',
                      }}
                    >
                      {sf1Match.match}/{sf1Match.total} em comum
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(sf1Match.match / sf1Match.total) * 100}%`,
                        background: 'linear-gradient(90deg, #06b6d4, #4ade80)',
                      }}
                    />
                  </div>
                  <div className="text-xs mt-2" style={{ color: '#6b7280' }}>
                    {Math.round((sf1Match.match / sf1Match.total) * 100)}% de concordância
                  </div>
                </div>
              )}

              {/* SF2 */}
              {sf2Match && (
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">🎵 Semifinal 2</span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        color:
                          sf2Match.match >= 7
                            ? '#4ade80'
                            : sf2Match.match >= 5
                            ? '#facc15'
                            : '#9ca3af',
                      }}
                    >
                      {sf2Match.match}/{sf2Match.total} em comum
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(sf2Match.match / sf2Match.total) * 100}%`,
                        background: 'linear-gradient(90deg, #06b6d4, #4ade80)',
                      }}
                    />
                  </div>
                  <div className="text-xs mt-2" style={{ color: '#6b7280' }}>
                    {Math.round((sf2Match.match / sf2Match.total) * 100)}% de concordância
                  </div>
                </div>
              )}

              {/* Final */}
              {finalMatch && (
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">🏆 Grande Final</span>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#4ade80' }}>
                        {finalMatch.exactMatch} posições exatas
                      </div>
                      <div className="text-xs" style={{ color: '#facc15' }}>
                        {finalMatch.closeMatch} próximas (±3)
                      </div>
                    </div>
                  </div>
                  {finalMatch.total > 0 ? (
                    <>
                      <div
                        className="w-full rounded-full h-2"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      >
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${
                              ((finalMatch.exactMatch + finalMatch.closeMatch * 0.5) /
                                (finalMatch.total || 26)) *
                              100
                            }%`,
                            background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                          }}
                        />
                      </div>
                      <div className="text-xs mt-2" style={{ color: '#6b7280' }}>
                        {finalMatch.total} países ranqueados por ambos
                      </div>
                    </>
                  ) : (
                    <p className="text-xs" style={{ color: '#4b5563' }}>
                      Um de vocês ainda não fez seu ranking da final.
                    </p>
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
