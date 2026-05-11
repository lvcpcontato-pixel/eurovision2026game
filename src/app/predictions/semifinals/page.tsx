import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import SemifinalsClient from '@/components/SemifinalsClient'

export default async function SemifinalsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: countries } = await supabase.from('countries').select('*').order('display_order')
  const { data: predictions } = await supabase
    .from('semifinal_predictions')
    .select('*')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />
      <div className="md:pl-64">
        <SemifinalsClient
          countries={countries || []}
          initialPredictions={predictions || []}
          userId={user.id}
        />
      </div>
    </div>
  )
}
