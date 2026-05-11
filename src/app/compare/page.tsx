import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import CompareClient from '@/components/CompareClient'

export default async function ComparePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  // Get all other users
  const { data: otherUsers } = await supabase
    .from('profiles')
    .select('*')
    .neq('id', user.id)

  // Get my predictions
  const { data: mySF } = await supabase
    .from('semifinal_predictions')
    .select('*')
    .eq('user_id', user.id)

  const { data: myFinal } = await supabase
    .from('final_predictions')
    .select('*')
    .eq('user_id', user.id)

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
        />
      </div>
    </div>
  )
}
