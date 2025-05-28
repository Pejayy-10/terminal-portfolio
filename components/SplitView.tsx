"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X, Minimize2, Maximize2 } from "lucide-react"

interface SplitViewProps {
  option: {
    label: string
    content: React.ReactNode
    command: string
  }
  onClose: () => void
  onHome: () => void
}

export default function SplitView({ option, onClose, onHome }: SplitViewProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [option])

  const HomeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  )

  return (
    <div className="w-1/2 ml-2 bg-gray-900/95 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg shadow-2xl shadow-cyan-500/20 animate-slideInRight flex flex-col h-[90vh]">
      <div className="flex items-center justify-between p-3 border-b border-cyan-400/30 bg-gray-800/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-cyan-400 font-mono text-sm">{option.label.toLowerCase().replace(/\s+/g, "_")}.exe</span>
          <span className="text-gray-500 text-xs">- Running</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onHome}
            className="text-blue-400 hover:text-blue-300 transition-colors p-1"
            aria-label="Home"
            title="Return to Home"
          >
            <HomeIcon />
          </button>
          <button className="text-yellow-400 hover:text-yellow-300 transition-colors p-1" aria-label="Minimize">
            <Minimize2 size={14} />
          </button>
          <button className="text-green-400 hover:text-green-300 transition-colors p-1" aria-label="Maximize">
            <Maximize2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 transition-colors p-1"
            aria-label="Close program"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div ref={contentRef} className="p-6 flex-1 overflow-y-auto text-gray-200 custom-scrollbar program-content min-h-0">
        <div className="mb-4">
          <div className="text-cyan-400 text-sm font-mono mb-2">Program: {option.label}</div>
          <div className="text-green-400 text-xs font-mono mb-4">
            Status: Executing... | PID: {Math.floor(Math.random() * 9999)}
          </div>
          <div className="border-b border-cyan-400/30 mb-4"></div>
        </div>

        <div className="animate-fadeIn">{option.content}</div>
      </div>

      <div className="p-2 border-t border-cyan-400/30 bg-gray-800/30 flex-shrink-0">
        <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
          <span>Memory: {Math.floor(Math.random() * 100)}MB</span>
          <span>CPU: {Math.floor(Math.random() * 50)}%</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  )
}
