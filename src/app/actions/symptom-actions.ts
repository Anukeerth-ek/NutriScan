'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Mock AI function
async function mockAIAnalysis(description: string) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    summary: `Analyzed: ${description.substring(0, 20)}...`,
    cause: "This could be due to stress or dietary changes.",
    worryLevel: "Low"
  }
}

export async function addSymptom(formData: FormData) {
  const description = formData.get('description') as string
  const severity = parseInt(formData.get('severity') as string)
  
  // TODO: Get real user ID from session
  // For now, we'll fetch the first user or create a dummy one if none exists
  // effectively bypassing auth for the prototype step if needed, or we fail.
  // Better: Create a dummy user in seed or check here.
  
  // TEMPORARY: Create a user if not exists just to make it work without Auth setup
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User'
      }
    })
  }
  
  const aiResult = await mockAIAnalysis(description)
  
  await prisma.symptomEntry.create({
    data: {
      userId: user.id,
      description,
      severity,
      aiSummary: aiResult.summary,
      aiCause: aiResult.cause,
      aiWorryLevel: aiResult.worryLevel,
      date: new Date()
    }
  })
  
  revalidatePath('/journal')
}

export async function getSymptoms() {
    // In real app, filter by session user
  const symptoms = await prisma.symptomEntry.findMany({
    orderBy: {
      date: 'desc'
    }
  })
  return symptoms
}
