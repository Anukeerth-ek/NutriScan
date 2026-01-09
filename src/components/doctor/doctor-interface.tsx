'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'

export function DoctorInterface() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [doctorResponse, setDoctorResponse] = useState('Hello! I am your AI Doctor. How can I help you today?')
  const [isTalking, setIsTalking] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Initialize Camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => console.error("Error accessing camera:", err))

    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.lang = 'en-US'
        recognition.interimResults = false
        
        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript
          setTranscript(text)
          handleDoctorResponse(text)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognitionRef.current = recognition
      }
    }
    
    // Initial Greeting
    // speak("Hello! I am your AI Doctor. How can I help you today?")
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      setTranscript('')
    }
  }

  const handleDoctorResponse = (userText: string) => {
      // Logic to process user text and generate response
      // Mock simple logic
      setIsTalking(true)
      let response = "I understand. Can you tell me more about that?"
      
      if (userText.toLowerCase().includes('headache')) {
          response = "I see you have a headache. Is it localized to one side?"
      } else if (userText.toLowerCase().includes('hello')) {
          response = "Hello there! How are you feeling?"
      } else if (userText.toLowerCase().includes('bye')) {
          response = "Goodbye! Take care."
      }

      setDoctorResponse(response)
      speak(response)
  }

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsTalking(false)
    setIsTalking(true)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
           {/* Doctor Avatar */}
           <Card className="aspect-video bg-black relative overflow-hidden flex items-center justify-center">
               <div className={`transition-opacity duration-300 ${isTalking ? 'animate-pulse' : ''} text-white text-center`}>
                   {/* Placeholder for Avatar Animation */}
                   <div className="w-32 h-32 rounded-full bg-blue-500 mx-auto mb-4 flex items-center justify-center text-4xl">
                       {isTalking ? '🗣️' : '👨‍⚕️'}
                   </div>
                   <p className="px-4">Dr. AI</p>
               </div>
               
               {/* Captions */}
               <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded text-white text-sm">
                   {doctorResponse}
               </div>
           </Card>

           {/* User Camera */}
           <Card className="aspect-video bg-black relative overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded text-white text-sm">
                   {transcript || "Listening..."}
               </div>
           </Card>
       </div>

       <div className="flex gap-4">
           <Button 
            size="lg" 
            variant={isListening ? "destructive" : "default"}
            onClick={toggleListening}
           >
               {isListening ? "Stop Speaking" : "Start Speaking"}
           </Button>
       </div>
    </div>
  )
}
