import Terminal from "@/components/Terminal"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-2 sm:p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg"></div>
      </div>
      <Terminal />
    </main>
  )
}
