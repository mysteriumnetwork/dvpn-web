import {
  NAV_CLIENT_CONNECTED,
  NAV_CLIENT_CONNECTING,
  NAV_CLIENT_CONNECTION_FAILED,
  NAV_CLIENT_DASHBOARD,
} from './client.links'
import ClientConnected from './pages/ClientConnected/ClientConnected'
import ClientConnecting from './pages/ClientConnecting/ClientConnecting'
import ClientConnectionFailed from './pages/ClientConnectionFailed/ClientConnectionFailed'
import ClientDashboard from './pages/ClientDashboard/ClientDashboard'

// eslint-disable-next-line import/prefer-default-export
export const clientRoutes = [
  {
    path: NAV_CLIENT_CONNECTED,
    component: ClientConnected,
  },
  {
    path: NAV_CLIENT_CONNECTING,
    component: ClientConnecting,
  },
  {
    path: NAV_CLIENT_CONNECTION_FAILED,
    component: ClientConnectionFailed,
  },
  {
    path: NAV_CLIENT_DASHBOARD,
    component: ClientDashboard,
  },
]
