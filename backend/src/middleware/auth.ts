import type { NextFunction, Request, Response } from 'express'
import { authService } from '../services/auth.service'
import type { Role } from '../data/types'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication required.' })
    return
  }

  try {
    const token = header.replace('Bearer ', '')
    req.auth = authService.verify(token)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' })
    return
  }
}

export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      res.status(403).json({ message: 'You do not have permission to access this resource.' })
      return
    }

    const userRole = req.auth.role.toLowerCase()
    const isAllowed = roles.some(r => userRole === r.toLowerCase() || userRole.startsWith(r.toLowerCase() + '_') || userRole.endsWith('_' + r.toLowerCase()))

    if (!isAllowed) {
      res.status(403).json({ message: 'You do not have permission to access this resource.' })
      return
    }

    next()
  }
}
