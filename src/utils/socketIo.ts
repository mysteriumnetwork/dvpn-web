import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

export const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL

export const socket = io(SOCKET_IO_URL, { forceNew: false })

export const socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/emit/')
