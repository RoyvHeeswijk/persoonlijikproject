'use client'

import { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Mic, Square, Play, Loader2 } from 'lucide-react'
import { transcribeAudio } from '../actions/transcribe'

export function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [transcription, setTranscription] = useState<string>('')
    const [isTranscribing, setIsTranscribing] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(audioBlob)
                setAudioUrl(url)

                try {
                    setIsTranscribing(true)
                    const text = await transcribeAudio(audioBlob)
                    setTranscription(text)
                } catch (error) {
                    console.error('Transcription error:', error)
                } finally {
                    setIsTranscribing(false)
                }
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (error) {
            console.error('Error accessing microphone:', error)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
            setIsRecording(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Voice Recorder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        variant={isRecording ? "destructive" : "default"}
                    >
                        {isRecording ? (
                            <>
                                <Square className="w-4 h-4 mr-2" />
                                Stop Recording
                            </>
                        ) : (
                            <>
                                <Mic className="w-4 h-4 mr-2" />
                                Start Recording
                            </>
                        )}
                    </Button>
                </div>

                {audioUrl && (
                    <div className="space-y-2">
                        <h3 className="font-medium">Playback:</h3>
                        <audio controls src={audioUrl} className="w-full" />
                    </div>
                )}

                {isTranscribing && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transcribing...
                    </div>
                )}

                {transcription && (
                    <div className="space-y-2">
                        <h3 className="font-medium">Transcription:</h3>
                        <p className="p-4 rounded-lg bg-muted">{transcription}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

