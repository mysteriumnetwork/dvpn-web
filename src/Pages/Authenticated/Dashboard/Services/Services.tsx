/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CurrentPricesResponse, ServiceInfo, ServiceStatus } from 'mysterium-vpn-js'

import { ServiceType } from '../../../../commons'
import './Services.scss'

import ServiceCard from './ServiceCard'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'
import { isRegistered } from '../../../../commons/identity.utils'

interface Props {
  prices: CurrentPricesResponse
}

const availableServices = [ServiceType.OPENVPN, ServiceType.WIREGUARD]

const findServiceInfo = (type: string, servicesInfos?: ServiceInfo[]): ServiceInfo | undefined => {
  if (!servicesInfos) {
    return undefined
  }

  const results = servicesInfos.filter((s) => s.type.toLowerCase() === type)
  if (results.length !== 1) {
    return undefined
  }
  return results[0]
}

// TODO can be simplified after removal of OpenVPN
const Services = ({ prices }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)
  const servicesInfos = useSelector(selectors.serviceInfoSelector)

  const cards = availableServices
    .filter((type) => {
      const service = findServiceInfo(type.toLowerCase(), servicesInfos)
      return !(type === ServiceType.OPENVPN && service?.status !== ServiceStatus.RUNNING)
    })
    .map((type, idx) => {
      const service = findServiceInfo(type.toLowerCase(), servicesInfos)
      return (
        <ServiceCard
          key={idx}
          identityRef={identity.id}
          serviceInfo={service}
          serviceType={type}
          config={config}
          disabled={!isRegistered(identity)}
          prices={prices}
        />
      )
    })

  return <div className="service-list">{cards}</div>
}

export default Services
