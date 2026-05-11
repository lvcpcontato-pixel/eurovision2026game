import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import AdminResultsClient from '@/components/AdminResultsClient'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  if (ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    redirect('/dashboard')
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: countries } = await supabase.from('countries').select('*').order('display_order')
  const { data: results } = await supabase.from('actual_results').select('*')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />
      <div className="md:pl-64">
        <AdminResultsClient
          countries={countries || []}
          initialResults={results || []}
          userId={user.id}
        />
      </div>
    </div>
  )
}
