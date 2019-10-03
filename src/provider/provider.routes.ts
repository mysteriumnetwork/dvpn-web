import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from './provider.links'
import ProviderSettings from './pages/ProviderSettings'
import ProviderDashboard from './pages/ProviderDashboard'

// eslint-disable-next-line import/prefer-default-export
export const providerRoutes = [
  {
    path: NAV_PROVIDER_SETTINGS,
    component: ProviderSettings,
  },
  {
    path: NAV_PROVIDER_DASHBOARD,
    component: ProviderDashboard,
  },
]
