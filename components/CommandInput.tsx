"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface CommandInputProps {
  onCommand: (command: string) => void
}

export default function CommandInput({ onCommand }: CommandInputProps) {
  const [command, setCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      onCommand(command)
      setCommandHistory((prev) => [...prev, command])
      setCommand("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-gray-900/30 p-2 rounded border border-green-500/30"
    >
      <span className="text-blue-400 whitespace-nowrap font-bold">guest@frandesal</span>
      <span className="text-white">:</span>
      <span className="text-purple-400">~</span>
      <span className="text-white">$</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400 focus:ring-0 placeholder-green-600"
        placeholder="Type a command..."
        autoFocus
        aria-label="Command input"
      />
      <div className="text-green-400 animate-pulse">█</div>
    </form>
  )
}
