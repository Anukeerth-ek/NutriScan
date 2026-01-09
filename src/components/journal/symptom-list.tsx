import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SymptomList({ symptoms }: { symptoms: any[] }) {
  if (symptoms.length === 0) {
    return <div className="text-center text-muted-foreground p-8">No symptoms logged yet.</div>
  }

  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-4">
        {symptoms.map((symptom) => (
          <Card key={symptom.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">
                  {new Date(symptom.date).toLocaleDateString()}
                </CardTitle>
                <div className="flex gap-2">
                   <Badge variant={symptom.severity > 7 ? "destructive" : "secondary"}>
                    Severity: {symptom.severity}
                   </Badge>
                   <Badge variant="outline">{symptom.aiWorryLevel}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{symptom.description}</p>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-semibold text-primary mb-1">🤖 AI Analysis</p>
                <p><strong>Use:</strong> {symptom.aiCause}</p>
                <p className="mt-1"><strong>Summary:</strong> {symptom.aiSummary}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
