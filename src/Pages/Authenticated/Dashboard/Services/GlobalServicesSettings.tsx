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
import { parseToastError, toastError } from '../../../../commons/toast.utils'
import BandwidthControl from '../../../../Components/BandwidthControl/BandwidthControl'
import Button from '../../../../Components/Buttons/Button'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import styles from './GlobalServicesSettings.module.scss'
import { ReactComponent as Settings } from '../../../../assets/images/authenticated/components/navigation/Settings.svg'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'
import { Modal } from '../../../../Components/Modal/Modal'

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

  const isBandwidthChangeLoading = (b: boolean = true) => {
    setState((cs) => ({ ...cs, isBandwidthChangeInProgress: b }))
  }

  const bandwidthKBps = (): number => {
    return (state.bandwidthMbps * 1_000) / 8
  }

  const openBandwidthModal = (b: boolean = true) => {
    setState((cs) => ({ ...cs, isBandwidthModalOpen: b }))
  }

  const onBandwidthSave = async () => {
    isBandwidthChangeLoading()
    try {
      await restartServices(tequila.setTrafficShaping(state.isShaping, bandwidthKBps()))
      openBandwidthModal(false)
    } catch (err) {
      parseToastError(err)
    } finally {
      isBandwidthChangeLoading(false)
    }
  }

  return (
    <div className={styles.settings}>
      <div className={styles.title}>Global Service Settings</div>
      <div className={styles.row}>
        <ConfirmationSwitch
          message="This will restart all running services to take affect."
          turnedOn={state.isVerified}
          onConfirm={() => {
            const c = !state.isVerified
            setState((cs) => ({ ...cs, isVerified: c }))
            return restartServices(tequila.setAccessPolicy(c ? 'mysterium' : ''))
          }}
        />
        <p className={styles.text}>Only Mysterium verified partner traffic</p>
        <p className={styles.subText}>
          Safe option: traffic vetted via business contracts, unavailable to the general public and limited to
          streaming. This option potentially will give less reward.
        </p>
      </div>
      <div className={styles.row}>
        <ConfirmationSwitch
          message="This will restart all running services to take affect."
          turnedOn={state.isShaping}
          onConfirm={() => {
            return restartServices(tequila.setTrafficShaping(!state.isShaping, bandwidthKBps()))
          }}
        />
        <p className={styles.text}>Limit bandwidth to {state.bandwidthMbps} Mbps</p>
        <Button
          className={styles.cobButton}
          onClick={() => openBandwidthModal()}
          disabled={!state.isShaping}
          extraStyle="outline-primary"
        >
          <Settings className={state.isShaping ? styles.cogEnabled : styles.cogDisabled} />
        </Button>
        <Modal
          open={state.isBandwidthModalOpen}
          title="Limit bandwidth"
          isLoading={state.isBandwidthChangeInProgress}
          controls={{
            onSave: onBandwidthSave,
            onClose: () => {
              openBandwidthModal(false)
              setState((cs) => ({ ...cs, bandwidthMbps: bandwidthMbps }))
            },
            onSaveLabel: 'Save & Restart',
          }}
          confirmationMessage="This will restart all running services to take affect."
          withConfirmation
        >
          <BandwidthControl
            onChange={(bandwidth) => setState((cs) => ({ ...cs, bandwidthMbps: bandwidth }))}
            bandwidthMbps={state.bandwidthMbps}
          />
        </Modal>
      </div>
    </div>
  )
}

export default GlobalServicesSettings
