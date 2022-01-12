/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ServiceInfo } from 'mysterium-vpn-js'
import React, { useEffect, useState } from 'react'
import { tequilaClient } from '../../../../api/tequila-client'
import { tequila } from '../../../../api/wrapped-calls'
import { configParser } from '../../../../commons/config'
import { parseError } from '../../../../commons/error.utils'
import { toastError } from '../../../../commons/toast.utils'
import BandwidthControl from '../../../../Components/BandwidthControl/BandwidthControl'
import Button from '../../../../Components/Buttons/Button'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import GenericModal from '../../../../Components/GenericModal/GenericModal'
import './GlobalServicesSettings.scss'
import { ReactComponent as Settings } from '../../../../assets/images/authenticated/components/navigation/Settings.svg'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'

interface State {
  isVerified: boolean
  isShaping: boolean
  bandwidthMbps: number
  isBandwidthModalOpen: boolean
  isBandwidthChangeInProgress: boolean
}

const GlobalServicesSettings = () => {
  const services = useSelector(selectors.serviceInfoSelector)
  const config = useSelector(selectors.configSelector)

  const stopServices = services.map((s) => (): Promise<void> => tequilaClient.serviceStop(s.id))
  const startServices = services.map((s) => (): Promise<ServiceInfo> =>
    tequilaClient.serviceStart({
      providerId: s.providerId,
      type: s.type,
    }),
  )

  const restartServices = async (doBefore: Promise<any>): Promise<any> => {
    try {
      await doBefore
      await Promise.all(stopServices.map((stop) => stop()))
      await Promise.all(startServices.map((start) => start()))
    } catch (err: any) {
      toastError(parseError(err))
    }
  }

  const isVerified = configParser.isAccessPolicyEnabled(config) as boolean
  const isShaping = configParser.isTrafficShapingEnabled(config)
  const bandwidthMbps = (configParser.trafficShapingBandwidthKBps(config) / 1_000) * 8

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
      bandwidthMbps: bandwidthMbps,
    }))
  }, [isShaping, isVerified, bandwidthMbps])

  const bandwidthKBps = (): number => {
    return (state.bandwidthMbps * 1_000) / 8
  }

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
              return restartServices(tequila.setAccessPolicy(c ? 'mysterium' : ''))
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
              return restartServices(tequila.setTrafficShaping(!state.isShaping, bandwidthKBps()))
            }}
          />
          <p className="text">Limit bandwidth to {state.bandwidthMbps} Mbps</p>
          <Button
            className="change-button"
            onClick={openBandwidthModal}
            disabled={!state.isShaping}
            extraStyle="outline-primary"
          >
            <Settings className={state.isShaping ? 'switch-limit-enabled' : 'switch-limit-disabled'} />
          </Button>
          <GenericModal
            isOpen={state.isBandwidthModalOpen}
            onClose={() => {
              closeBandwidthModal()
              setState((cs) => ({ ...cs, bandwidthMbps: bandwidthMbps }))
            }}
            onSave={() => {
              Promise.resolve()
                .then(() => setState((cs) => ({ ...cs, isBandwidthChangeInProgress: true })))
                .then(() => restartServices(tequila.setTrafficShaping(state.isShaping, bandwidthKBps())))
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
              bandwidthMbps={state.bandwidthMbps}
            />
          </GenericModal>
        </div>
      </div>
    </div>
  )
}

export default GlobalServicesSettings
