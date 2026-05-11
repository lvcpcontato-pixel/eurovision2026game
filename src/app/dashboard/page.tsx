import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Trophy, Music, Star, Users, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Count predictions
  const { count: sf1Count } = await supabase
    .from('semifinal_predictions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('semifinal', 1)

  const { count: sf2Count } = await supabase
    .from('semifinal_predictions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('semifinal', 2)

  const { count: finalCount } = await supabase
    .from('final_predictions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Count total users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const userName = profile?.full_name || user.email?.split('@')[0] || 'Palpiteiro'
  const sf1Complete = (sf1Count || 0) >= 10
  const sf2Complete = (sf2Count || 0) >= 10
  const finalComplete = (finalCount || 0) >= 26

  const completionPct = Math.round(
    ((sf1Complete ? 1 : 0) + (sf2Complete ? 1 : 0) + (finalComplete ? 1 : 0)) / 3 * 100
  )

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a', paddingLeft: '0' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />

      <main className="md:pl-64 px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-4xl mx-auto" style={{ maxWidth: 'calc(768px + 256px)' }}>
        <div className="md:pl-0" style={{ maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#a78bfa' }}>
              <Sparkles size={14} />
              <span>Basel • Suíça • Maio 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">
              Olá, {userName.split(' ')[0]}! 👋
            </h1>
            <p style={{ color: '#9ca3af' }}>
              {completionPct === 100
                ? 'Seus palpites estão completos! 🎉 Boa sorte!'
                : 'Complete seus palpites antes do início do Eurovision!'}
            </p>
          </div>

          {/* Progress overview */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'linear-gradient(to right, rgba(88, 28, 135, 0.3), rgba(131, 24, 67, 0.3))', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">Progresso dos Palpites</span>
              <span className="font-bold text-xl" style={{ color: '#c4b5fd' }}>{completionPct}%</span>
            </div>
            <div className="w-full rounded-full h-3 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%`, background: 'linear-gradient(to right, #8B5CF6, #EC4899)' }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl p-3" style={sf1Complete ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)' } : { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-bold text-white">{sf1Count || 0}/10</div>
                <div style={{ color: sf1Complete ? '#86efac' : '#6b7280' }}>Semifinal 1 {sf1Complete ? '✓' : ''}</div>
              </div>
              <div className="rounded-xl p-3" style={sf2Complete ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)' } : { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-bold text-white">{sf2Count || 0}/10</div>
                <div style={{ color: sf2Complete ? '#86efac' : '#6b7280' }}>Semifinal 2 {sf2Complete ? '✓' : ''}</div>
              </div>
              <div className="rounded-xl p-3" style={finalComplete ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)' } : { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-bold text-white">{finalCount || 0}/26</div>
                <div style={{ color: finalComplete ? '#86efac' : '#6b7280' }}>Grande Final {finalComplete ? '✓' : ''}</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href="/predictions/semifinals" className="group rounded-2xl p-6 flex items-center gap-4 transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                <Music size={24} style={{ color: '#a78bfa' }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Semifinais</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Escolha os 10 classificados de cada semi</div>
              </div>
              <ChevronRight size={16} style={{ color: '#4b5563' }} />
            </Link>

            <Link href="/predictions/final" className="group rounded-2xl p-6 flex items-center gap-4 transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)' }}>
                <Star size={24} style={{ color: '#f472b6' }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Grande Final</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Ranqueie os 26 países finalistas</div>
              </div>
              <ChevronRight size={16} style={{ color: '#4b5563' }} />
            </Link>

            <Link href="/leaderboard" className="group rounded-2xl p-6 flex items-center gap-4 transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                <Trophy size={24} style={{ color: '#fbbf24' }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Ranking</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Veja quem está na frente</div>
              </div>
              <ChevronRight size={16} style={{ color: '#4b5563' }} />
            </Link>

            <Link href="/compare" className="group rounded-2xl p-6 flex items-center gap-4 transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }}>
                <Users size={24} style={{ color: '#22d3ee' }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Comparar</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>{totalUsers || 0} participante{(totalUsers || 0) !== 1 ? 's' : ''}</div>
              </div>
              <ChevronRight size={16} style={{ color: '#4b5563' }} />
            </Link>
          </div>

          {/* Eurovision fun fact */}
          <div className="rounded-2xl p-4 text-center" style={{ background: 'linear-gradient(to right, rgba(49, 46, 129, 0.3), rgba(88, 28, 135, 0.3))', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <div className="text-2xl mb-2">🎶</div>
            <p className="text-sm" style={{ color: '#9ca3af' }}>
              <span className="text-white font-medium">Eurovision 2026</span> acontece em Basel, Suíça.<br />
              Quanto mais você acerta, mais pontos você ganha!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
