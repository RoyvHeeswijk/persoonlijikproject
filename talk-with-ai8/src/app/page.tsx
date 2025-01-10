import { VoiceRecorder } from '../../components/voice-recorder'

export default function Home() {
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
              <p className="text-sm">I'm doing great, thanks! How about you?</p>
              <span className="text-xs text-white/80">09:57</span>
            </div>
          </div>
          <div className="flex justify-center">
            <VoiceRecorder />
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
            <button className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

