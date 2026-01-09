import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <section className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            AI Health Care Companion
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Your personal AI-powered health journal and virtual doctor consultation, available 24/7.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>AI Symptoms Journal</CardTitle>
              <CardDescription>
                Log your daily symptoms and get instant AI-powered analysis and patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/journal">
                <Button className="w-full">Open Journal</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Live AI Doctor</CardTitle>
              <CardDescription>
                Have a face-to-face video consultation with our AI Doctor avatar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/doctor">
                <Button className="w-full" variant="secondary">Start Consultation</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
