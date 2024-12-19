"use client";

import { Microphone } from "../../components/Button";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voice Recorder</h1>
      <Microphone />
    </div>
  );
}

