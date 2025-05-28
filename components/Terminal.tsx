"use client"

import { useEffect, useRef, useState } from "react"
import ASCIIBanner from "./ASCIIBanner"
import CommandInput from "./CommandInput"
import SplitView from "./SplitView"
// Force re-import of useTerminal hook
import { useTerminal } from "../lib/hooks/useTerminal"

export default function Terminal() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  
  // Explicit destructuring with type assertion to help VS Code
  const terminalHook = useTerminal()
  const {
    stage,
    setStage,
    commandHistory,
    selectedOption,
    setSelectedOption,
    splitViewOpen,
    setSplitViewOpen,
    handleCommand,
    menuOptions,
    clearHistory,
  } = terminalHook

  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory, stage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && stage === "intro") {
        setStage("menu")
      }

      if (e.key === "Escape" && splitViewOpen) {
        setSplitViewOpen(false)
        setSelectedOption(null)
      }

      if (e.key === "Home" || (e.ctrlKey && e.key === "h")) {
        setStage("intro")
        clearHistory()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [stage, setStage, splitViewOpen, setSplitViewOpen, setSelectedOption, clearHistory])

  // Handle time updates on client-side only to prevent hydration mismatches
  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
      setCurrentDate(new Date().toLocaleDateString())
    }
    
    updateTime() // Set initial time and date
    const interval = setInterval(updateTime, 1000) // Update every second
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto h-[90vh] flex">
      <div
        className={`bg-black/95 backdrop-blur-sm border-2 border-green-400/50 rounded-lg shadow-2xl shadow-green-500/20 transition-all duration-500 ${
          splitViewOpen ? "w-1/2 mr-2" : "w-full"
        }`}
      >
        <div className="flex items-center gap-2 p-3 border-b border-green-400/30 bg-gray-900/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-green-400 font-mono text-sm">frandesal@portfolio-v2.0.1</span>
          </div>
          <div className="text-green-400/70 text-xs font-mono">{mounted ? currentTime : "--:--:--"}</div>
        </div>

        <div className="p-4 h-full overflow-y-auto font-mono text-green-400 custom-scrollbar" ref={terminalRef}>
          {stage === "intro" && (
            <div className="space-y-2">
              <div className="text-green-300 text-xs opacity-70">
                <div className="typing-fast">Initializing portfolio system...</div>
                <div className="typing-fast delay-1000">Loading user profile: Frandesal</div>
                <div className="typing-fast delay-2000">System ready.</div>
              </div>

              <ASCIIBanner />

              <div className="mt-6 space-y-3">
                <div className="text-cyan-400 typing-animation">
                  Welcome to Frandesal's Interactive Portfolio Terminal v2.0.1
                </div>
                <div className="text-yellow-400 typing-animation delay-2000">
                  Type: Full Stack Developer | Status: Available for hire
                </div>
                <div className="text-green-300 typing-animation delay-3000">
                  Last login: {mounted ? currentDate : "loading..."} from terminal
                </div>
                <div className="blinking-cursor mt-4 text-white">Press ENTER to access main interface...</div>
              </div>
            </div>
          )}

          {stage === "menu" && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <div className="text-cyan-400 mb-2">╭─ MAIN MENU ─────────────────────────────────╮</div>
                <div className="text-cyan-400 mb-4">│ Select an option to execute: │</div>
                <div className="space-y-1 mb-4">
                  {menuOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 hover:bg-green-900/20 p-1 rounded transition-colors"
                    >
                      <span className="text-yellow-400 font-bold">[{index + 1}]</span>
                      <span className="text-green-300">{option.label}</span>
                      <span className="text-gray-500 text-sm">- {option.description}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-1 rounded transition-colors mt-3 pt-2 border-t border-cyan-400/30">
                    <span className="text-blue-400 font-bold">[0]</span>
                    <span className="text-blue-300">Return to Home</span>
                    <span className="text-gray-500 text-sm">- Go back to intro screen</span>
                  </div>
                </div>
                <div className="text-cyan-400">╰─────────────────────────────────────────────╯</div>
              </div>

              <div className="space-y-1 mb-4">
                {commandHistory.map((entry, index) => (
                  <div key={index} className="font-mono">
                    <div className="flex gap-2 items-center">
                      <span className="text-blue-400">guest@frandesal</span>
                      <span className="text-white">:</span>
                      <span className="text-purple-400">~</span>
                      <span className="text-white">$</span>
                      <span className="text-green-300">{entry.command}</span>
                    </div>
                    {entry.response && <div className="pl-4 text-red-400 mt-1 text-sm">{entry.response}</div>}
                  </div>
                ))}
              </div>

              <CommandInput onCommand={handleCommand} />
            </div>
          )}
        </div>
      </div>

      {splitViewOpen && selectedOption && (
        <SplitView
          option={selectedOption}
          onClose={() => {
            setSplitViewOpen(false)
            setSelectedOption(null)
          }}
          onHome={() => {
            setStage("intro")
            clearHistory()
            setSplitViewOpen(false)
            setSelectedOption(null)
          }}
        />
      )}
    </div>
  )
}
