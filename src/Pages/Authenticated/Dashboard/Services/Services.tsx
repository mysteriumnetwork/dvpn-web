/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { CurrentPricesResponse, ServiceInfo, ServiceStatus } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'

import { ServiceType } from '../../../../commons'
import './Services.scss'

import ServiceCard from './ServiceCard'

interface Props {
  identityRef: string
  servicesInfos?: ServiceInfo[]
  userConfig: Config
  disabled?: boolean
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

const Services = ({ identityRef, servicesInfos, userConfig, disabled, prices }: Props) => {
  return (
    <div className="service-list">
      {availableServices.map((type) => {
        const service = findServiceInfo(type.toLowerCase(), servicesInfos)
        if (type === ServiceType.OPENVPN && service?.status !== ServiceStatus.RUNNING) {
          return <></>
        }
        return (
          <ServiceCard
            key={type}
            identityRef={identityRef}
            serviceInfo={service}
            serviceType={type}
            config={userConfig}
            disabled={disabled}
            prices={prices}
          />
        )
      })}
    </div>
  )
}

export default Services
