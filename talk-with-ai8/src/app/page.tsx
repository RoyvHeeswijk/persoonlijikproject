'use client'

import { useState, useEffect } from 'react'
import { transcripttext, VoiceRecorder } from '../../components/voice-recorder'

export default function Home() {
  const [displayText, setDisplayText] = useState('')

  // Update displayText whenever transcripttext changes
  useEffect(() => {
    const checkTranscript = setInterval(() => {
      if (transcripttext !== displayText) {
        setDisplayText(transcripttext)
      }
    }, 100)

    return () => clearInterval(checkTranscript)
  }, [displayText])

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto h-screen flex flex-col">
   
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              A
            </div>
            <div>
              <div className="font-medium text-black">Alice</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex gap-2">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm text-black">Hey! How are you?</p>
              <span className="text-xs text-gray-500">09:55</span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-white" style={{ fontSize: '15px' }}>{displayText}</p>
              <span className="text-xs text-white/80">09:57</span>
            </div>
          </div>
          <div className="flex justify-center">
        
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500 text-black"
            />
           
              <VoiceRecorder />
         
          </div>
        </div>
      </div>
    </main>
  )
}
