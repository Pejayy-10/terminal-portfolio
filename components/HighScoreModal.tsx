"use client"

import React, { useState } from "react"

interface HighScoreModalProps {
  score: number
  isNewHighScore: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

export default function HighScoreModal({ 
  score, 
  isNewHighScore, 
  onClose, 
  onSubmit 
}: HighScoreModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-green-400/50 rounded-lg p-6 max-w-md w-full">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">
            {isNewHighScore ? "🎉 NEW HIGH SCORE! 🎉" : "Game Over"}
          </h2>
          
          <div className="text-yellow-400 text-lg">
            Final Score: {score}
          </div>

          {isNewHighScore && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-green-400 mb-2 text-sm">
                  Enter your name for the leaderboard:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-green-500/30 rounded-md p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                  placeholder="Your name..."
                  maxLength={20}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Score
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-red-600/20 border border-red-400/50 hover:bg-red-600/30 text-red-400 font-mono py-2 px-4 rounded transition-colors"
                >
                  Skip
                </button>
              </div>
            </form>
          )}

          {!isNewHighScore && (
            <button
              onClick={onClose}
              className="bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-2 px-6 rounded transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
