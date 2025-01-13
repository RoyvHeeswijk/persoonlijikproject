'use client'

import { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Mic, Square, Play, Loader2 } from 'lucide-react'
import { transcribeAudio } from '../actions/transcribe'

export let transcripttext = ''

export function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false)
    const [isTranscribing, setIsTranscribing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])

    const startRecording = async () => {
        try {
            setError(null)
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                try {
                    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
                    setIsTranscribing(true)
                    const text = await transcribeAudio(audioBlob)
                    if (!text) {
                        throw new Error('No transcription returned')
                    }
                    transcripttext = text
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown transcription error'
                    // Check if the error is a quota exceeded error
                    if (errorMessage.includes('insufficient_quota') || errorMessage.includes('exceeded your current quota')) {
                        const quotaError = 'OpenAI API quota exceeded. Please check your billing details or try again later.'
                        console.error('Transcription quota error:', quotaError)
                        setError(quotaError)
                    } else {
                        console.error('Transcription error:', errorMessage)
                        setError(`Failed to transcribe audio: ${errorMessage}`)
                    }
                } finally {
                    setIsTranscribing(false)
                }
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('Error accessing microphone:', errorMessage)
            setError(`Failed to access microphone: ${errorMessage}`)
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
        <Card className="w-full max-w-md mx-auto text-black">
            <CardContent className="space-y-4">
                {!isTranscribing && (
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={isRecording ? stopRecording : startRecording}
                            variant={isRecording ? "destructive" : "default"}
                        >     
                            {isRecording ? (
                                <Square className="h-[30px] w-[30px]" />
                            ) : (
                                <Mic className="h-[30px] w-[30px]" />
                            )}
                        </Button>
                    </div>
                )}

                {error && (
                    <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                {isTranscribing && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
