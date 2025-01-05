import { Microphone } from "@/app/components/Microphone";
require('dotenv').config();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Microphone />
    </main>
  );
}
