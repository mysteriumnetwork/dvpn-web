/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import './GlobalServicesSettings.scss'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isAccessPolicyEnabled, isTrafficShapingEnabled } from '../../../../commons/config'
import { useSnackbar } from 'notistack'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import { ServiceInfo } from 'mysterium-vpn-js/src/provider/service-info'
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
  const [state, setState] = useState<State>({
    isVerified: isVerified,
    isShaping: isShaping,
  })
  useEffect(() => {
    setState((cs) => ({ ...cs, isShaping: isShaping, isVerified: isVerified }))
  }, [isShaping, isVerified])

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
          <ConfirmationSwitch
            message="This will restart all running services to take affect."
            turnedOn={state.isShaping}
            onConfirm={() => {
              const c = !state.isShaping
              setState((cs) => ({ ...cs, isShaping: c }))
              return restartServices(setTrafficShaping(c))
            }}
          />
          <p className="text">Limit bandwidth to 5Mb/s</p>
        </div>
      </div>
    </div>
  )
}

export default GlobalServicesSettings
