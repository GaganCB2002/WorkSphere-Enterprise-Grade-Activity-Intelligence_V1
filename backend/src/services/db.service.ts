import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { store } from '../data/store'

const MONGO_URI = process.env.MONGODB_URI
const DB_PATH = path.join(__dirname, '../../data/db.json')

// Models are now defined in src/models

class DBService {
  private localData: any
  private useMongo: boolean = false

  constructor() {
    this.localData = this.loadLocal()
    this.connect()
  }

  private async connect() {
    if (mongoose.connection.readyState === 1) {
      this.useMongo = true
      console.log('Premium Database (MongoDB) Connected Successfully.')
    } else {
      mongoose.connection.once('connected', () => {
        this.useMongo = true
        console.log('Premium Database (MongoDB) Connected Successfully.')
      })
      mongoose.connection.on('error', () => {
        this.useMongo = false
      })
    }
  }

  private loadLocal(): any {
    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8')
        return JSON.parse(raw)
      } catch (err) {
        return store
      }
    }
    return store
  }

  private persistLocal(data: any) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
    } catch (err) {
      console.error('Failed to persist local DB', err)
    }
  }

  public get() {
    return this.localData
  }

  public async update(updater: (data: any) => void) {
    updater(this.localData)
    this.persistLocal(this.localData)
    // In a real scenario, we would also update MongoDB here
  }

  public save() {
    this.persistLocal(this.localData)
  }
}

export const db = new DBService()
