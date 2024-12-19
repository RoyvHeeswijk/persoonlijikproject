"use client";

import { useRecordVoice } from "../hooks/useRecordVoice";

const Microphone = () => {
    const { startRecording, stopRecording, text } = useRecordVoice();

    return (
        <div className="flex flex-col justify-center items-center">
            <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="border-none bg-transparent w-10"
            >
             
            </button>
            <p>{text}</p>
        </div>
    );
};

export { Microphone };

