import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import FinalPredictionsClient from '@/components/FinalPredictionsClient'

export default async function FinalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: countries } = await supabase.from('countries').select('*').order('display_order')
  const { data: sfPredictions } = await supabase
    .from('semifinal_predictions')
    .select('country_id, semifinal')
    .eq('user_id', user.id)
  const { data: finalPredictions } = await supabase
    .from('final_predictions')
    .select('country_id, position')
    .eq('user_id', user.id)
    .order('position')

  const allCountries = countries || []
  const sfPickIds = new Set((sfPredictions || []).map(p => p.country_id))
  const eligibleCountries = allCountries
    .filter(c => c.is_direct_finalist || sfPickIds.has(c.id))
    .map(c => ({ id: c.id, name: c.name, flag_emoji: c.flag_emoji }))

  const hasSemiPredictions = (sfPredictions || []).length > 0

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation user={{ full_name: profile?.full_name, avatar_url: profile?.avatar_url, email: user.email }} />
      <div className="md:pl-64">
        <FinalPredictionsClient
          eligibleCountries={eligibleCountries}
          initialPredictions={finalPredictions || []}
          userId={user.id}
          hasSemiPredictions={hasSemiPredictions}
        />
      </div>
    </div>
  )
}
