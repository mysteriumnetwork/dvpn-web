import { ProviderState } from '../../../provider/reducer'
import { NodeHealthcheck, ServiceInfo } from 'mysterium-vpn-js'

export type ServiceProviderProps = {
  node?: NodeHealthcheck,
  provider: ProviderState,
  onStopVpnServer: (services: ServiceInfo[]) => Promise<void>
  onStartVpnServer: Function,
}

