/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react'
import { CurrentPricesResponse, ServiceInfo, ServiceStatus } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'

import { ServiceType } from '../../../../commons'
import { isAccessPolicyEnabled } from '../../../../commons/config'
import { Switch } from '../../../../Components/Switch'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'

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
  const [booting, setBooting] = useState<boolean>(false)
  const { status, id } = { ...serviceInfo }
  const { enqueueSnackbar } = useSnackbar()

  const startService = (serviceType: string) => {
    setBooting(true)
    tequilapiClient
      .serviceStart({
        providerId: identityRef,
        type: serviceType,
      })
      .catch((err) => {
        enqueueSnackbar(parseError(err) || `Service "${serviceType}" could not be started`, {
          variant: 'error',
        })
        console.log(err)
      })
      .finally(() => setBooting(false))
  }

  const stopService = (serviceId: string) => {
    setBooting(true)
    tequilapiClient
      .serviceStop(serviceId)
      .catch((err) => {
        enqueueSnackbar(parseError(err) || `Service "${serviceType}" could not be stopped`, {
          variant: 'error',
        })
        console.log(err)
      })
      .finally(() => setBooting(false))
  }

  const accessPolicyEnabled = isAccessPolicyEnabled(config)
  return (
    <div className="service">
      <ServiceHeader whitelisted={accessPolicyEnabled} running={status === RUNNING} type={serviceType} />

      <div className="service__details">
        <ServiceDetail label="Price per hour">{displayMyst(Number(prices.pricePerHour))}</ServiceDetail>

        <ServiceDetail label="Price per GiB">{displayMyst(Number(prices.pricePerGib))}</ServiceDetail>

        <ServiceDetail label="On" alignValueRight={true}>
          <Switch
            disabled={booting || disabled}
            turnedOn={!!serviceInfo}
            handleChange={() => {
              if (!id) {
                startService(serviceType.toLowerCase())
              } else {
                stopService(id)
              }
            }}
          />
        </ServiceDetail>
      </div>
    </div>
  )
}

export default ServiceCard
