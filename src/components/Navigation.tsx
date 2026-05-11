'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Music, Trophy, Users, LogOut, Star } from 'lucide-react'

interface NavProps {
  user: { full_name?: string; avatar_url?: string; email?: string }
}

export default function Navigation({ user }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Início' },
    { href: '/predictions/semifinals', icon: Music, label: 'Semifinais' },
    { href: '/predictions/final', icon: Star, label: 'Final' },
    { href: '/leaderboard', icon: Trophy, label: 'Ranking' },
    { href: '/compare', icon: Users, label: 'Comparar' },
  ]

  const sidebarStyle = {
    backgroundColor: '#12122a',
    borderRight: '1px solid #2a2a4a',
  }

  const cardBg = '#12122a'
  const borderColor = '#2a2a4a'

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 p-6 z-50" style={sidebarStyle}>
        <div className="mb-8">
          <div className="text-3xl mb-1">🎤</div>
          <h1 className="text-lg font-black text-white">Eurovision 2026</h1>
          <p className="text-xs" style={{ color: '#a78bfa' }}>Palpites &amp; Previsões</p>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {links.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all"
                style={{
                  backgroundColor: active ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                  color: active ? '#c4b5fd' : '#9ca3af',
                  border: active ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </div>

        <div className="pt-4" style={{ borderTop: `1px solid ${borderColor}` }}>
          <div className="flex items-center gap-3 mb-3">
            {user.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#7c3aed' }}>
                {(user.full_name || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user.full_name || 'Usuário'}</div>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm w-full transition-colors"
            style={{ color: '#6b7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-2" style={{ backgroundColor: cardBg, borderTop: `1px solid ${borderColor}` }}>
        <div className="flex justify-around">
          {links.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
                style={{ color: active ? '#a78bfa' : '#6b7280' }}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
