"use client"

import { useEffect, useState } from "react"

export default function ASCIIBanner() {
  const [mounted, setMounted] = useState(false)
  const [dateString, setDateString] = useState("")

  useEffect(() => {
    setMounted(true)
    const currentYear = new Date().getFullYear()
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0")
    const currentDay = String(new Date().getDate()).padStart(2, "0")
    setDateString(`${currentYear}.${currentMonth}.${currentDay}`)
  }, [])

  const asciiArt = `
  ███████╗██████╗  █████╗ ███╗   ██╗██████╗ ███████╗███████╗ █████╗ ██╗     
  ██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔════╝██╔══██╗██║     
  █████╗  ██████╔╝███████║██╔██╗ ██║██║  ██║█████╗  ███████╗███████║██║     
  ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██╔══╝  ╚════██║██╔══██║██║     
  ██║     ██║  ██║██║  ██║██║ ╚████║██████╔╝███████╗███████║██║  ██║███████╗
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
`

  return (
    <div className="my-6">
      <pre className="text-green-400 font-mono text-xs sm:text-sm leading-tight overflow-x-auto whitespace-pre glow-text">
        {asciiArt}
      </pre>

      <div className="mt-4 text-center space-y-1">
        <div className="text-cyan-400 text-sm">
          ╔══════════════════════════════════════════════════════════════════╗
        </div>
        <div className="text-cyan-400 text-sm">║ FULL STACK DEVELOPER ║</div>
        <div className="text-cyan-400 text-sm">║ React • Next.js • TypeScript ║</div>
        <div className="text-cyan-400 text-sm">║ Node.js • MongoDB • AWS ║</div>
        <div className="text-cyan-400 text-sm">
          ╚══════════════════════════════════════════════════════════════════╝
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-yellow-400 text-xs animate-pulse">
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        </div>
        <div className="text-green-300 text-xs mt-1">
          System Version: 2.0.1 | Build: {mounted ? dateString : "loading..."}
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-gray-500 text-xs">Tip: Type home or 0 anytime to return to this screen</div>
      </div>
    </div>
  )
}
