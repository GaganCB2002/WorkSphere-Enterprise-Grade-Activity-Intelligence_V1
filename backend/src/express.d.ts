import type { AuthPayload } from './data/types'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload
    }
  }
}

export {}
