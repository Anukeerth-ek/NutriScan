import { getSymptoms } from '@/app/actions/symptom-actions'
import { SymptomForm } from '@/components/journal/symptom-form'
import { SymptomList } from '@/components/journal/symptom-list'

export default async function JournalPage() {
  const symptoms = await getSymptoms()

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">AI Health Journal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h2 className="text-xl font-semibold mb-4">New Entry</h2>
           <SymptomForm />
        </div>
        
        <div>
           <h2 className="text-xl font-semibold mb-4">History</h2>
           <SymptomList symptoms={symptoms} />
        </div>
      </div>
    </div>
  )
}
