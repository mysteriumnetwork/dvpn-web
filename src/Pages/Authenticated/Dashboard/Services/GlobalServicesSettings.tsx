/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import './GlobalServicesSettings.scss'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isAccessPolicyEnabled, isTrafficShapingEnabled, trafficShapingBandwidthKbps } from '../../../../commons/config'
import { useSnackbar } from 'notistack'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import BandwidthControl from '../../../../Components/BandwidthControl/BandwidthControl'
import { ServiceInfo } from 'mysterium-vpn-js'
import { setAccessPolicy, setTrafficShaping } from '../../../../api/TequilAPIWrapper'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'
import BandwidthControlModal from './BandwidthControlModal'
import Button from '../../../../Components/Buttons/Button'

interface Props {
  config: Config
  servicesInfos?: ServiceInfo[]
}

interface State {
  isVerified: boolean
  isShaping: boolean
  bandwidthMbps: number
  isBandwidthModalOpen: boolean
  isBandwidthChangeInProgress: boolean
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
      .then(() => stopServices.map((stop) => stop()))
      .then(() => startServices.map((start) => start()))
      .catch((err) => {
        enqueueSnackbar(parseError(err), { variant: 'error' })
      })
  }

  const { enqueueSnackbar } = useSnackbar()

  const isVerified = isAccessPolicyEnabled(config) as boolean
  const isShaping = isTrafficShapingEnabled(config)
  const bandwidthMbps = trafficShapingBandwidthKbps(config) / 1000
  const [state, setState] = useState<State>({
    isVerified: isVerified,
    isShaping: isShaping,
    bandwidthMbps: bandwidthMbps,
    isBandwidthModalOpen: false,
    isBandwidthChangeInProgress: false,
  })
  useEffect(() => {
    setState((cs) => ({
      ...cs,
      isShaping: isShaping,
      isVerified: isVerified,
      bandwidth: bandwidthMbps,
    }))
  }, [isShaping, isVerified, bandwidthMbps])

  const openBandwidthModal = () => {
    setState((cs) => ({ ...cs, isBandwidthModalOpen: true }))
  }

  const closeBandwidthModal = () => {
    setState((cs) => ({ ...cs, isBandwidthModalOpen: false }))
  }

  const isServiceRunning = services.length > 0

  return (
    <div className="services-footer">
      <div className="services-footer__title">Global Service Settings</div>
      <div className="services-footer__content">
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
          <p className="under-text">
            Safe option: traffic vetted via business contracts, unavailable to the general public and limited to
            streaming. This option potentially will give less reward.
          </p>
        </div>
        <div className="switch-row">
          <ConfirmationSwitch
            message="This will restart all running services to take affect."
            turnedOn={state.isShaping}
            onConfirm={() => {
              return restartServices(setTrafficShaping(!state.isShaping, state.bandwidthMbps))
            }}
          />
          <p className="text">Limit bandwidth</p>
          <Button
            className="change-button"
            onClick={openBandwidthModal}
            disabled={!state.isShaping}
            extraStyle="outline-primary"
          >
            {state.bandwidthMbps} Mb/s
          </Button>
          <BandwidthControlModal
            isOpen={state.isBandwidthModalOpen}
            onClose={() => closeBandwidthModal()}
            onSave={() => {
              Promise.resolve()
                .then(() => setState((cs) => ({ ...cs, isBandwidthChangeInProgress: true })))
                .then(() => restartServices(setTrafficShaping(state.isShaping, state.bandwidthMbps * 1000)))
                .then(closeBandwidthModal)
                .finally(() => setState((cs) => ({ ...cs, isBandwidthChangeInProgress: false })))
            }}
            saveText={isServiceRunning ? 'Save & Restart' : 'save'}
            isLoading={state.isBandwidthChangeInProgress}
            title="Limit bandwidth"
            confirm={isServiceRunning}
            confirmMessage="This will restart all running services to take affect."
          >
            <BandwidthControl
              onChange={(bandwidth) => setState((cs) => ({ ...cs, bandwidthMbps: bandwidth }))}
              bandwidth={state.bandwidthMbps}
            />
          </BandwidthControlModal>
        </div>
      </div>
    </div>
  )
}

export default GlobalServicesSettings
