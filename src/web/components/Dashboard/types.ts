import { ProviderState } from '../../../provider/reducer'
import { NodeHealthcheck, ServiceInfo } from 'mysterium-vpn-js'
import { EventsProps } from '../../../hocs/withEvents'

export type ServiceProviderProps = {
  node?: NodeHealthcheck,
  provider: ProviderState,
  onStopVpnServer: (services: ServiceInfo[]) => Promise<void>
  onStartVpnServer: Function,
  onInit: Function,
  onDestroy: Function
}

export type DashboardProps = ServiceProviderProps & EventsProps

