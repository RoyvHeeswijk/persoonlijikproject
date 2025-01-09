'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function transcribeAudio(audioBlob: Blob) {
    try {
        const formData = new FormData()
        formData.append('file', audioBlob, 'recording.webm')
        formData.append('model', 'whisper-1')

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new Error(
                `Transcription failed: ${response.status} ${response.statusText}${
                    errorData ? ` - ${JSON.stringify(errorData)}` : ''
                }`
            )
        }

        const data = await response.json()
        return data.text
    } catch (error) {
        console.error('Error transcribing audio:', error)
        throw error
    }
}

