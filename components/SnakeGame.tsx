"use client"

import React, { useState, useEffect, useCallback } from "react"
import HighScoreModal from "./HighScoreModal"

interface Position {
  x: number
  y: number
}

interface HighScore {
  name: string
  score: number
  created_at: string
}

const BOARD_WIDTH = 20
const BOARD_HEIGHT = 16
const INITIAL_SNAKE = [{ x: 10, y: 8 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>({ x: 15, y: 8 })
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [showHighScoreModal, setShowHighScoreModal] = useState(false)
  const [highScore, setHighScore] = useState<HighScore | null>(null)
  const [isNewHighScore, setIsNewHighScore] = useState(false)

  // Load high score on component mount
  useEffect(() => {
    fetchHighScore()
  }, [])

  const fetchHighScore = async () => {
    try {
      const response = await fetch('/api/highscore')
      const data = await response.json()
      if (data.success && data.highScore) {
        setHighScore(data.highScore)
      }
    } catch (error) {
      console.error('Error fetching high score:', error)
    }
  }

  const generateFood = useCallback(() => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT),
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood({ x: 15, y: 8 })
    setScore(0)
    setIsGameOver(false)
    setIsGameRunning(false)
    setShowHighScoreModal(false)
  }

  const startGame = () => {
    if (isGameOver) {
      resetGame()
    }
    setIsGameRunning(true)
  }

  const pauseGame = () => {
    setIsGameRunning(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
    setIsGameRunning(false)
    
    // Check if this is a new high score
    const isNewHigh = !highScore || score > highScore.score
    setIsNewHighScore(isNewHigh)
    setShowHighScoreModal(true)
  }

  const handleHighScoreSubmit = async (name: string) => {
    try {
      const response = await fetch('/api/highscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      })
      
      const data = await response.json()
      if (data.success && data.isNewHighScore) {
        // Refresh the high score display
        fetchHighScore()
      }
    } catch (error) {
      console.error('Error saving high score:', error)
    }
    
    setShowHighScoreModal(false)
  }

  const moveSnake = useCallback(() => {
    if (!isGameRunning || isGameOver) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
        setTimeout(handleGameOver, 100)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setTimeout(handleGameOver, 100)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, isGameRunning, isGameOver, generateFood])

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGameRunning) return

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          e.preventDefault()
          if (isGameRunning) {
            pauseGame()
          } else {
            startGame()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isGameRunning])

  const renderBoard = () => {
    const board = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        let cellType = 'empty'
        
        if (snake.some(segment => segment.x === x && segment.y === y)) {
          cellType = snake[0].x === x && snake[0].y === y ? 'head' : 'body'
        } else if (food.x === x && food.y === y) {
          cellType = 'food'
        }

        board.push(
          <div
            key={`${x}-${y}`}
            className={`w-4 h-4 border ${
              cellType === 'head' 
                ? 'bg-green-400 border-green-600' 
                : cellType === 'body'
                ? 'bg-green-600 border-green-700'
                : cellType === 'food'
                ? 'bg-red-400 border-red-600'
                : 'bg-gray-900 border-gray-700'
            }`}
          />
        )
      }
    }
    return board
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        Terminal Snake Game
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-yellow-400 font-mono">Score: {score}</div>
            {highScore && (
              <div className="text-cyan-400 font-mono">
                High Score: {highScore.score} by {highScore.name}
              </div>
            )}
          </div>
          <div className="space-x-2">
            {!isGameRunning && !isGameOver && (
              <button
                onClick={startGame}
                className="bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-1 px-3 rounded transition-colors"
              >
                Start Game
              </button>
            )}
            {isGameRunning && (
              <button
                onClick={pauseGame}
                className="bg-yellow-600/20 border border-yellow-400/50 hover:bg-yellow-600/30 text-yellow-400 font-mono py-1 px-3 rounded transition-colors"
              >
                Pause
              </button>
            )}
            {(isGameRunning || isGameOver) && (
              <button
                onClick={resetGame}
                className="bg-red-600/20 border border-red-400/50 hover:bg-red-600/30 text-red-400 font-mono py-1 px-3 rounded transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
          <div 
            className="grid gap-0 mx-auto w-fit"
            style={{ 
              gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
              gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`
            }}
          >
            {renderBoard()}
          </div>
        </div>

        {isGameOver && !showHighScoreModal && (
          <div className="text-center space-y-2">
            <div className="text-red-400 font-bold">Game Over!</div>
            <div className="text-yellow-400">Final Score: {score}</div>
            <button
              onClick={startGame}
              className="bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-2 px-4 rounded transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="border border-cyan-400/30 rounded-lg p-4 bg-gray-800/20">
          <h4 className="text-yellow-400 mb-2 font-semibold">Controls:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
            <div>• Arrow Keys or WASD: Move</div>
            <div>• Spacebar: Pause/Resume</div>
            <div>• Avoid walls and yourself</div>
            <div>• Eat red food to grow</div>
          </div>
        </div>
      </div>

      {showHighScoreModal && (
        <HighScoreModal
          score={score}
          isNewHighScore={isNewHighScore}
          onClose={() => setShowHighScoreModal(false)}
          onSubmit={handleHighScoreSubmit}
        />
      )}
    </div>
  )
}
