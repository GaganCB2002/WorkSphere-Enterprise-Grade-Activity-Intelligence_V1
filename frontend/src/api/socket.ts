import { io } from 'socket.io-client'

const WS_URL = import.meta.env.VITE_WEBSOCKET_URL
const SOCKET_URL = WS_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3005')

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  path: '/socket.io',
})
