/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ServiceInfo } from 'mysterium-vpn-js'
import React, { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import { ReactComponent as Settings } from '../../../../assets/images/authenticated/components/navigation/Settings.svg'
import { configs } from '../../../../commons/config'
import errors from '../../../../commons/errors'
import BandwidthControl from '../../../../Components/BandwidthControl/BandwidthControl'
import Button from '../../../../Components/Buttons/Button'
import ConfirmationSwitch from '../../../../Components/ConfirmationSwitch/ConfirmationSwitch'
import { Modal } from '../../../../Components/Modal/Modal'
import { selectors } from '../../../../redux/selectors'
import styles from './GlobalServicesSettings.module.scss'
import { useAppSelector } from '../../../../commons/hooks'

const { parseToastError } = errors
const { api } = tequila

interface State {
  bandwidthMbps: number
  isBandwidthModalOpen: boolean
  isBandwidthChangeInProgress: boolean
}

const GlobalServicesSettings = () => {
  const services = useAppSelector(selectors.serviceInfoSelector)
  const config = useAppSelector(selectors.configSelector)

  const stopServices = services.map((s) => (): Promise<void> => api.serviceStop(s.id))
  const startServices = services.map((s) => (): Promise<ServiceInfo> =>
    api.serviceStart({
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
      parseToastError(err)
    }
  }

  const isVerified = configs.isAccessPolicyEnabled(config) as boolean
  const isShaping = configs.isTrafficShapingEnabled(config)
  const bandwidthMbps = (configs.trafficShapingBandwidthKBps(config) / 1_000) * 8

  const [state, setState] = useState<State>({
    bandwidthMbps: bandwidthMbps,
    isBandwidthModalOpen: false,
    isBandwidthChangeInProgress: false,
  })
  useEffect(() => {
    setState((cs) => ({
      ...cs,
      bandwidthMbps: bandwidthMbps,
    }))
  }, [isShaping, bandwidthMbps])

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
      await restartServices(tequila.setTrafficShaping(isShaping, bandwidthKBps()))
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
          turnedOn={isVerified}
          onConfirm={() => {
            return restartServices(tequila.setAccessPolicy(!isVerified ? 'mysterium' : ''))
          }}
        />
        <p className={styles.text}>Only Mysterium verified partner traffic</p>
        <p className={styles.subText}>
          Safe option: traffic vetted via business contracts and unavailable to the general public. This option
          potentially will give less reward.
        </p>
      </div>
      <div className={styles.row}>
        <ConfirmationSwitch
          message="This will restart all running services to take affect."
          turnedOn={isShaping}
          onConfirm={() => {
            return restartServices(tequila.setTrafficShaping(!isShaping, bandwidthKBps()))
          }}
        />
        <p className={styles.text}>Limit bandwidth to {bandwidthMbps} Mbps</p>
        <Button
          className={styles.cobButton}
          onClick={() => openBandwidthModal()}
          disabled={!isShaping}
          extraStyle="outline-primary"
        >
          <Settings className={isShaping ? styles.cogEnabled : styles.cogDisabled} />
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