import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Trophy, Star } from 'lucide-react'

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: leaderboard } = await supabase.from('leaderboard').select('*')

  const myRank = leaderboard?.findIndex(u => u.user_id === user.id) ?? -1

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />
      <div className="md:pl-64">
        <main className="px-4 md:px-8 py-6 pb-24 md:pb-8" style={{ maxWidth: 'calc(512px + 256px)', margin: '0 auto' }}>
          <div style={{ maxWidth: '512px', margin: '0 auto' }}>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-1">🏆 Ranking</h1>
              <p style={{ color: '#9ca3af' }}>Quem está arrasando nos palpites?</p>
            </div>

            {/* My position highlight */}
            {myRank >= 0 && (
              <div className="rounded-2xl p-4 mb-6" style={{ background: 'linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(131, 24, 67, 0.4))', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div className="text-sm mb-1" style={{ color: '#c4b5fd' }}>Sua posição</div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-white">#{myRank + 1}</div>
                  <div style={{ color: '#d1d5db' }}>
                    <div className="font-semibold">{leaderboard?.[myRank]?.full_name}</div>
                    <div className="text-sm" style={{ color: '#c4b5fd' }}>{leaderboard?.[myRank]?.total_points} pontos</div>
                  </div>
                </div>
              </div>
            )}

            {/* Scoring guide */}
            <div className="rounded-2xl p-4 mb-6" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Star size={14} style={{ color: '#fbbf24' }} />
                Como funciona a pontuação
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: '#9ca3af' }}>
                <div>✅ Classificado acertado: <strong className="text-white">5 pts</strong></div>
                <div>🎯 Posição exata na final: <strong className="text-white">12 pts</strong></div>
                <div>📍 ±1 posição: <strong className="text-white">8 pts</strong></div>
                <div>📍 ±2 posições: <strong className="text-white">5 pts</strong></div>
                <div>📍 ±3 posições: <strong className="text-white">3 pts</strong></div>
                <div>📍 ±5 posições: <strong className="text-white">1 pt</strong></div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="flex flex-col gap-3">
              {!leaderboard || leaderboard.length === 0 ? (
                <div className="text-center py-12 rounded-2xl" style={{ color: '#4b5563', backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                  <Trophy size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Nenhum participante ainda.<br />Convide seus amigos!</p>
                </div>
              ) : (
                leaderboard.map((entry, index) => {
                  const isMe = entry.user_id === user.id
                  const medals = ['🥇', '🥈', '🥉']
                  return (
                    <div
                      key={entry.user_id}
                      className="flex items-center gap-4 rounded-2xl p-4 transition-all"
                      style={isMe
                        ? { backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '2px solid rgba(139, 92, 246, 0.5)' }
                        : { backgroundColor: cardBg, border: `1px solid ${borderColor}` }
                      }
                    >
                      <div className="w-8 text-center font-black text-lg">
                        {index < 3 ? medals[index] : <span style={{ color: '#6b7280' }}>#{index + 1}</span>}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        {entry.avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#7c3aed' }}>
                            {(entry.full_name || entry.username || '?')[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate" style={{ color: isMe ? '#c4b5fd' : 'white' }}>
                          {entry.full_name || entry.username}
                          {isMe && <span className="text-xs ml-1" style={{ color: '#a78bfa' }}>(você)</span>}
                        </div>
                        <div className="text-xs flex gap-3" style={{ color: '#6b7280' }}>
                          <span>SF1: {entry.sf1_points}pt</span>
                          <span>SF2: {entry.sf2_points}pt</span>
                          <span>Final: {entry.final_points}pt</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black" style={{ color: isMe ? '#c4b5fd' : 'white' }}>
                          {entry.total_points}
                        </div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>pts</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <p className="text-center text-xs mt-4" style={{ color: '#4b5563' }}>
              Os pontos serão calculados automaticamente quando os resultados forem revelados.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
