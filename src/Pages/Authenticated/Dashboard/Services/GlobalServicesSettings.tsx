/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import './GlobalServicesSettings.scss'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isAccessPolicyEnabled, isTrafficShapingEnabled, trafficShapingBandwidth } from '../../../../commons/config'
import { useSnackbar } from 'notistack'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import BandwidthControl from '../../../../Components/BandwidthControl/BandwidthControl'
import { ServiceInfo } from 'mysterium-vpn-js'
import { setAccessPolicy, setTrafficShaping } from '../../../../api/TequilAPIWrapper'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'

interface Props {
  config: Config
  servicesInfos?: ServiceInfo[]
}

interface State {
  isVerified: boolean
  isShaping: boolean
  bandwidth: number
}

const GlobalServicesSettings = ({ config, servicesInfos }: Props) => {
  const services = servicesInfos || []
  const stopServices = services.map((s) => (): Promise<void> => tequilapiClient.serviceStop(s.id))
  const startServices = services.map((s) => (): Promise<ServiceInfo> =>
    tequilapiClient.serviceStart({
      providerId: s.providerId,
      type: s.type,
    }),
  )

  const restartServices = (doBefore: Promise<any>): Promise<any> => {
    return doBefore
      .then(() => Promise.all(stopServices.map((stop) => stop())))
      .then(() => Promise.all(startServices.map((start) => start())))
      .catch((err) => {
        enqueueSnackbar(parseError(err), { variant: 'error' })
      })
  }

  const { enqueueSnackbar } = useSnackbar()

  const isVerified = isAccessPolicyEnabled(config) as boolean
  const isShaping = isTrafficShapingEnabled(config)
  const bandwidth = trafficShapingBandwidth(config)
  const [state, setState] = useState<State>({
    isVerified: isVerified,
    isShaping: isShaping,
    bandwidth: bandwidth,
  })
  useEffect(() => {
    setState((cs) => ({ ...cs, isShaping: isShaping, isVerified: isVerified, bandwidth: bandwidth }))
  }, [isShaping, isVerified, bandwidth])

  return (
    <div className="services-footer">
      <div className="services-footer__title">Global Service Settings</div>
      <div className="services-footer__content">
        <div className="partners-block">
          <div className="switch-row">
            <ConfirmationSwitch
              message="This will restart all running services to take affect."
              turnedOn={state.isVerified}
              onConfirm={() => {
                const c = !state.isVerified
                setState((cs) => ({ ...cs, isVerified: c }))
                return restartServices(setAccessPolicy(c ? 'mysterium' : ''))
              }}
            />
            <p className="text">Only Mysterium verified partner traffic</p>
          </div>
          <p className="under-text">
            Safe option: traffic vetted via business contracts, unavailable to the general public and limited to
            streaming. This option potentially will give less reward.
          </p>
        </div>
        <div className="limits-block">
          <BandwidthControl
            message="This will restart all running services to take affect."
            turnedOn={state.isShaping}
            bandwidthExt={state.bandwidth / 1000}
            onConfirm={(isShaping: boolean, bandwidth: number) => {
              setState((cs) => ({ ...cs, isShaping: isShaping, bandwidth: bandwidth }))
              return restartServices(setTrafficShaping(isShaping, bandwidth * 1000))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GlobalServicesSettings
