import { DoctorInterface } from '@/components/doctor/doctor-interface'

export default function DoctorPage() {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Live AI Doctor Consultation</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl">
        Speak naturally to the AI Doctor. Make sure your camera and microphone are enabled.
      </p>
      
      <DoctorInterface />
    </div>
  )
}
