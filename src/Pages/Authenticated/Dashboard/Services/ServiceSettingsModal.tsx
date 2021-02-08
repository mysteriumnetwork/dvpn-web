/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Fade, Modal } from '@material-ui/core'
import { ServiceInfo } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'

import './ServiceSettingsModal.scss'
import { PRICE_PER_GB_STEP, PRICE_PER_MINUTE_STEP } from '../../../../constants/defaults'

import MystSlider from '../../../../Components/MystSlider/MystSlider'
import { ServiceType } from '../../../../commons'
import Button from '../../../../Components/Buttons/Button'
import { setServicePrice } from '../../../../api/TequilAPIWrapper'
import { parseError } from '../../../../commons/error.utils'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { displayMystLongNoDecimal, displayMystNoDecimal } from '../../../../commons/money.utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  serviceType: ServiceType
  currentPricePerGb: number
  currentPricePerMinute: number
  pricePerGbMax: number
  pricePerMinuteMax: number
  identityRef: string
  serviceInfo?: ServiceInfo
}

interface StateProps {
  pricePerGbChosen: number
  pricePerMinuteChosen: number
}

const ServiceSettingsModal = ({
  onClose,
  isOpen,
  serviceType,
  currentPricePerGb,
  currentPricePerMinute,
  pricePerGbMax,
  pricePerMinuteMax,
  serviceInfo,
  identityRef,
}: Props): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useState<StateProps>({
    pricePerMinuteChosen: currentPricePerMinute,
    pricePerGbChosen: currentPricePerGb,
  })

  useEffect(() => {
    setState({
      ...state,
      pricePerMinuteChosen: currentPricePerMinute,
      pricePerGbChosen: currentPricePerGb,
    })
  }, [currentPricePerMinute, currentPricePerGb])

  const restartService = (): Promise<any> => {
    if (!serviceInfo?.id) {
      return Promise.resolve() // service is stopped
    }
    return tequilapiClient.serviceStop(serviceInfo.id).then(() =>
      tequilapiClient.serviceStart({
        providerId: identityRef,
        type: serviceType.toLowerCase(),
      }),
    )
  }

  return (
    <Modal
      className="settings-modal"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="settings-modal--block">
          <div className="title">{serviceType} Settings</div>
          <div className="settings-row">
            <div className="settings-row--slider">
              <MystSlider
                label="Price per hour"
                headerAmount={(v) => `${displayMystLongNoDecimal(v * 60)}`}
                popover={(v) => `${displayMystLongNoDecimal(v * 60)}`}
                myst={true}
                value={state.pricePerMinuteChosen}
                handleChange={(e, v) => {
                  setState({ ...state, pricePerMinuteChosen: v })
                }}
                step={PRICE_PER_MINUTE_STEP}
                min={0}
                max={pricePerMinuteMax}
                disabled={false}
              />
              <div className="bottom-line">
                <p>{displayMystLongNoDecimal(0)}</p>
                <p>{displayMystLongNoDecimal(pricePerMinuteMax * 60)}</p>
              </div>
            </div>
            <div className="settings-row--slider">
              <MystSlider
                label="Price per GB"
                headerAmount={(v) => displayMystNoDecimal(v)}
                myst={true}
                value={state.pricePerGbChosen}
                handleChange={(e, v) => {
                  setState({ ...state, pricePerGbChosen: v })
                }}
                step={PRICE_PER_GB_STEP}
                min={0}
                max={pricePerGbMax}
                disabled={false}
              />
              <div className="bottom-line">
                <p>{displayMystNoDecimal(0)}</p>
                <p>{displayMystNoDecimal(pricePerGbMax)}</p>
              </div>
            </div>
          </div>
          <div className="buttons-block">
            <Button onClick={onClose} extraStyle="gray">
              Close
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true)
                setServicePrice(state.pricePerMinuteChosen, state.pricePerGbChosen, serviceType)
                  .then(() => restartService())
                  .then(() => onClose())
                  .catch((err) => {
                    enqueueSnackbar(parseError(err), { variant: 'error' })
                  })
                  .finally(() => {
                    setIsLoading(false)
                  })
              }}
            >
              {serviceInfo ? 'Save & Restart' : 'Save'}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default ServiceSettingsModal
