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
import { PRICE_PER_GIB_STEP, PRICE_PER_HOUR_STEP } from '../../../../constants/defaults'

import MystSlider from '../../../../Components/MystSlider/MystSlider'
import { ServiceType } from '../../../../commons'
import Button from '../../../../Components/Buttons/Button'
import { setServicePrice } from '../../../../api/TequilAPIWrapper'
import { parseError } from '../../../../commons/error.utils'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { displayMystLongNoDecimal } from '../../../../commons/money.utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  serviceType: ServiceType
  currentPricePerGiB: number
  currentPricePerHour: number
  pricePerGiBMax: number
  pricePerHourMax: number
  identityRef: string
  serviceInfo?: ServiceInfo
}

interface StateProps {
  pricePerGiBChosen: number
  pricePerHourChosen: number
}

const ServiceSettingsModal = ({
  onClose,
  isOpen,
  serviceType,
  currentPricePerGiB,
  currentPricePerHour,
  pricePerGiBMax,
  pricePerHourMax,
  serviceInfo,
  identityRef,
}: Props): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useState<StateProps>({
    pricePerHourChosen: currentPricePerHour,
    pricePerGiBChosen: currentPricePerGiB,
  })

  useEffect(() => {
    setState((cs) => ({
      ...cs,
      pricePerHourChosen: currentPricePerHour,
      pricePerGiBChosen: currentPricePerGiB,
    }))
  }, [currentPricePerHour, currentPricePerGiB])

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
                headerAmount={(v) => `${displayMystLongNoDecimal(v)}`}
                popover={(v) => `${displayMystLongNoDecimal(v)}`}
                myst={true}
                value={state.pricePerHourChosen}
                handleChange={(e, v) => {
                  setState((cs) => ({ ...cs, pricePerHourChosen: v }))
                }}
                step={PRICE_PER_HOUR_STEP}
                min={0}
                max={pricePerHourMax}
                disabled={false}
              />
              <div className="bottom-line">
                <p>{displayMystLongNoDecimal(0)}</p>
                <p>{displayMystLongNoDecimal(pricePerHourMax)}</p>
              </div>
            </div>
            <div className="settings-row--slider">
              <MystSlider
                label="Price per GiB"
                headerAmount={(v) => displayMystLongNoDecimal(v)}
                myst={true}
                value={state.pricePerGiBChosen}
                handleChange={(e, v) => {
                  setState((cs) => ({ ...cs, pricePerGiBChosen: v }))
                }}
                step={PRICE_PER_GIB_STEP}
                min={0}
                max={pricePerGiBMax}
                disabled={false}
              />
              <div className="bottom-line">
                <p>{displayMystLongNoDecimal(0)}</p>
                <p>{displayMystLongNoDecimal(pricePerGiBMax)}</p>
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
                setServicePrice(state.pricePerHourChosen, state.pricePerGiBChosen, serviceType)
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
