import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

export const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL
export const SOCKET_IO_URL2 = process.env.REACT_APP_HTTP_API_URL

export const socket = io("ws://localhost:8080", {
  timeout:200000,
  transports: ['websocket']
})

export const socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/emit/')
