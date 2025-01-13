'use client'

import { useState, useEffect } from 'react'
import { transcripttext, VoiceRecorder } from '../../components/voice-recorder'
import { Button } from '../../components/ui/button'
import { Send } from 'lucide-react'

export default function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showTextInput, setShowTextInput] = useState(false)
  const [lastTranscriptUsed, setLastTranscriptUsed] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)

  useEffect(() => {
    const checkTranscript = setInterval(() => {
      if (transcripttext && transcripttext !== inputMessage && transcripttext !== lastTranscriptUsed) {
        setInputMessage(transcripttext)
        setShowTextInput(true)
        setIsRecording(false)
        setIsTranscribing(false)
      }
    }, 100)

    return () => clearInterval(checkTranscript)
  }, [inputMessage, lastTranscriptUsed])

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, inputMessage])
      setLastTranscriptUsed(transcripttext)
      setInputMessage('')
      setShowTextInput(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
   
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

     
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          <div className="flex gap-2">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm text-black">Hey! How are you?</p>
              <span className="text-xs text-gray-500">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          {messages.map((message, index) => (
            <div key={index} className="flex justify-end gap-2">
              <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-white" style={{ fontSize: '15px' }}>{message}</p>
                <span className="text-xs text-white/80">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
          {isRecording && !isTranscribing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-4">
                  <div className="w-32 h-32 rounded-full bg-blue-500/20 animate-ping"></div>
                </div>
                <div className="absolute -inset-8">
                  <div className="w-40 h-40 rounded-full bg-blue-400/10 animate-pulse"></div>
                </div>
                <div className="absolute -inset-12">
                  <div className="w-48 h-48 rounded-full border-4 border-blue-500/30 animate-[spin_3s_linear_infinite]"></div>
                </div>
                <div className="w-24 h-24 rounded-full bg-blue-500/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 animate-pulse flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isTranscribing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-blue-500/40 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>


       
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            {showTextInput && (
              <>
                <input 
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500 text-black"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  onClick={handleSend}
                  className="rounded-full p-2"
                  variant="default"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </>
            )}
            <div className={showTextInput ? "w-auto" : "w-full"} onClick={() => {
              setIsRecording(!isRecording);
              setIsTranscribing(false);
            }}>
              <VoiceRecorder />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
