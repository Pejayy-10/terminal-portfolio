import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'

// Database setup
const dbPath = path.join(process.cwd(), 'highscores.db')
const db = new Database(dbPath)

// Initialize the database table
db.exec(`
  CREATE TABLE IF NOT EXISTS highscores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export async function GET() {
  try {
    const stmt = db.prepare('SELECT name, score, created_at FROM highscores ORDER BY score DESC LIMIT 1')
    const highScore = stmt.get()
    
    return NextResponse.json({
      success: true,
      highScore: highScore || null
    })
  } catch (error) {
    console.error('Error getting high score:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get high score' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, score } = await request.json()
    
    if (!name || typeof score !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Name and score are required' },
        { status: 400 }
      )
    }

    // Get current high score
    const currentHighScoreStmt = db.prepare('SELECT score FROM highscores ORDER BY score DESC LIMIT 1')
    const currentHighScore = currentHighScoreStmt.get()
    
    // Only insert if this score is higher than the current high score
    if (!currentHighScore || score > currentHighScore.score) {
      // Delete all previous records (we only keep the highest)
      db.exec('DELETE FROM highscores')
      
      // Insert the new high score
      const insertStmt = db.prepare('INSERT INTO highscores (name, score) VALUES (?, ?)')
      insertStmt.run(name, score)
      
      return NextResponse.json({
        success: true,
        isNewHighScore: true,
        message: 'New high score!'
      })
    } else {
      return NextResponse.json({
        success: true,
        isNewHighScore: false,
        message: 'Score not high enough'
      })
    }
  } catch (error) {
    console.error('Error saving high score:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save high score' },
      { status: 500 }
    )
  }
}
