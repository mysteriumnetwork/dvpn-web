import { NAV_LOGIN, NAV_TERMS, NAV_WELCOME } from './app.links'
import Welcome from './pages/Welcome'
import Terms from './pages/Terms'
import Login from './pages/Login'

// eslint-disable-next-line import/prefer-default-export
export const appRoutes = [
  {
    path: NAV_WELCOME,
    component: Welcome,
  },
  {
    path: NAV_TERMS,
    component: Terms,
  },
  {
    path: NAV_LOGIN,
    component: Login,
  },
]
