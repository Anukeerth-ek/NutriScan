'use client'

import { addSymptom } from '@/app/actions/symptom-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'

export function SymptomForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Daily Symptom Log</CardTitle>
        <CardDescription>Tell the AI how you are feeling today.</CardDescription>
      </CardHeader>
      <form action={async (formData) => {
        await addSymptom(formData)
        formRef.current?.reset()
      }} ref={formRef}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">What are your symptoms?</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="e.g., I have a headache and feel nauseous..." 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity (1-10)</Label>
            <Input 
              type="number" 
              id="severity" 
              name="severity" 
              min="1" 
              max="10" 
              defaultValue="5"
              required 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Log Symptom</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
