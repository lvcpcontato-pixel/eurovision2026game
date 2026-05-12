import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import CompareClient from '@/components/CompareClient'

export default async function ComparePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const [
    { data: otherUsers },
    { data: mySF },
    { data: myFinal },
    { data: countries },
  ] = await Promise.all([
    supabase.from('profiles').select('*').neq('id', user.id),
    supabase.from('semifinal_predictions').select('*').eq('user_id', user.id),
    supabase.from('final_predictions').select('*').eq('user_id', user.id),
    supabase.from('countries').select('*').order('display_order'),
  ])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />
      <div className="md:pl-64">
        <CompareClient
          currentUser={profile}
          otherUsers={otherUsers || []}
          mySFPredictions={mySF || []}
          myFinalPredictions={myFinal || []}
          userId={user.id}
          countries={countries || []}
        />
      </div>
    </div>
  )
}
