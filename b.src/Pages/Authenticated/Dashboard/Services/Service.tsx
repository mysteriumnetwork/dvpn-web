/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CurrentPricesResponse, ServiceStatus } from 'mysterium-vpn-js'
import React, { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import { WIREGUARD } from '../../../../commons'
import { configs } from '../../../../commons/config'
import identities from '../../../../commons/identities'
import { myst } from '../../../../commons/mysts'
import { callWithToast } from '../../../../commons/calls'
import { Switch } from '../../../../Components/Switch'
import { CURRENT_PRICES_EMPTY } from '../../../../constants/instances'
import { selectors } from '../../../../redux/selectors'
import ServiceDetail from './ServiceDetail'
import ServiceHeader from './ServiceHeader'
import './Services.scss'
import { useAppSelector } from '../../../../commons/hooks'

const { isRegistered } = identities
const { api } = tequila
const { RUNNING } = ServiceStatus

const Service = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const servicesInfos = useAppSelector(selectors.serviceInfoSelector)

  const [loading, setLoading] = useState<boolean>(false)
  const [prices, setPrices] = useState<CurrentPricesResponse>(CURRENT_PRICES_EMPTY)

  useEffect(() => {
    ;(async () => {
      setPrices(await tequila.api.pricesCurrent())
    })()
  }, [])

  const serviceInfo = servicesInfos.find((it) => it.type === WIREGUARD)
  const { status, id } = { ...serviceInfo }
  const disabled = !isRegistered(identity)

  const startService = async (serviceType: string) => {
    setLoading(true)
    await callWithToast(() =>
      api.serviceStart({
        providerId: identity.id,
        type: serviceType,
      }),
    )
    setLoading(false)
  }

  const stopService = async (serviceId: string) => {
    setLoading(true)
    await callWithToast(() => api.serviceStop(serviceId))
    setLoading(false)
  }

  const accessPolicyEnabled = configs.isAccessPolicyEnabled(config)

  return (
    <div className="service-list">
      <div className="service">
        <ServiceHeader whitelisted={accessPolicyEnabled} running={status === RUNNING} />

        <div className="service__details">
          <ServiceDetail label="Price per hour">{myst.display(prices.pricePerHourTokens.wei)}</ServiceDetail>

          <ServiceDetail label="Price per GB">
            {myst.display(myst.toBig(prices.pricePerGibTokens.wei).times(1000000000).div(1073741824))}
          </ServiceDetail>

          <ServiceDetail label="On" alignValueRight={true}>
            <Switch
              disabled={loading || disabled}
              turnedOn={!!serviceInfo}
              handleChange={async () => {
                if (!id) {
                  await startService(WIREGUARD)
                } else {
                  await stopService(id)
                }
              }}
            />
          </ServiceDetail>
        </div>
      </div>
    </div>
  )
}

export default Service
