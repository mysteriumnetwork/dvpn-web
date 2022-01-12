/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react'
import { CurrentPricesResponse, ServiceInfo, ServiceStatus } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js'

import { ServiceType } from '../../../../commons'
import { configParser } from '../../../../commons/config'
import { callWithToast } from '../../../../commons/promise.utils'
import { Switch } from '../../../../Components/Switch'
import { tequilaClient } from '../../../../api/tequila-client'

import ServiceHeader from './ServiceHeader'
import ServiceDetail from './ServiceDetail'
import { displayMyst } from '../../../../commons/money.utils'

const { RUNNING } = ServiceStatus

interface Props {
  identityRef: string
  serviceType: ServiceType
  serviceInfo?: ServiceInfo
  config: Config
  disabled?: boolean
  prices: CurrentPricesResponse
}

const ServiceCard = ({ serviceType, serviceInfo, identityRef, config, disabled = false, prices }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { status, id } = { ...serviceInfo }

  const startService = async (serviceType: string) => {
    setLoading(true)
    await callWithToast(() =>
      tequilaClient.serviceStart({
        providerId: identityRef,
        type: serviceType,
      }),
    )
    setLoading(false)
  }

  const stopService = async (serviceId: string) => {
    setLoading(true)
    await callWithToast(() => tequilaClient.serviceStop(serviceId))
    setLoading(false)
  }

  const accessPolicyEnabled = configParser.isAccessPolicyEnabled(config)
  return (
    <div className="service">
      <ServiceHeader whitelisted={accessPolicyEnabled} running={status === RUNNING} type={serviceType} />

      <div className="service__details">
        <ServiceDetail label="Price per hour">{displayMyst(Number(prices.pricePerHour))}</ServiceDetail>

        <ServiceDetail label="Price per GB">
          {displayMyst(Number((BigInt(prices.pricePerGib) * BigInt(1000000000)) / BigInt(1073741824)))}
        </ServiceDetail>

        <ServiceDetail label="On" alignValueRight={true}>
          <Switch
            disabled={loading || disabled}
            turnedOn={!!serviceInfo}
            handleChange={async () => {
              if (!id) {
                await startService(serviceType.toLowerCase())
              } else {
                await stopService(id)
              }
            }}
          />
        </ServiceDetail>
      </div>
    </div>
  )
}

export default ServiceCard
