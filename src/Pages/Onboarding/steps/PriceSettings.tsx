/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React from 'react'
import { pricePerGiBMax, pricePerHourMax, defaultPricePerGiB, defaultPricePerHour } from '../../../commons/config'

import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import MystSlider from '../../../Components/MystSlider/MystSlider'
import { setAllServicePrice } from '../../../api/TequilAPIWrapper'
import { PRICE_PER_GIB_STEP, PRICE_PER_HOUR_STEP } from '../../../constants/defaults'
import Button from '../../../Components/Buttons/Button'
import { displayMystLongNoDecimal } from '../../../commons/money.utils'

interface StateInterface {
  checked: boolean
  pricePerHour: number
  pricePerGiB: number
}

const PriceSettings = ({ config, callbacks }: { config: Config; callbacks: OnboardingChildProps }): JSX.Element => {
  const pricePerMinMaxRange = pricePerHourMax(config)
  const pricePerGbMaxRange = pricePerGiBMax(config)

  const [state, setState] = React.useState<StateInterface>({
    checked: false,
    pricePerHour: defaultPricePerHour(config),
    pricePerGiB: defaultPricePerGiB(config),
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((cs) => ({
      ...cs,
      checked: event.target.checked,
      pricePerHour: defaultPricePerHour(config),
      pricePerGiB: defaultPricePerGiB(config),
    }))
  }

  const handlePricePerHourChanged = (event: any, newValue: number) => {
    setState((cs) => ({
      ...cs,
      pricePerHour: newValue,
    }))
  }

  const handlePricePerGiBChanged = (event: any, newValue: number) => {
    setState((cs) => ({
      ...cs,
      pricePerGiB: newValue,
    }))
  }

  const handleSettingSetup = () => {
    setAllServicePrice(state.pricePerHour, state.pricePerGiB).then(() => callbacks.nextStep())
  }

  return (
    <div className="step">
      <h1 className="step__title">Service price settings</h1>
      <p className="step__description">Fill in the following information to start running a VPN service.</p>
      <div className="step__content m-t-100">
        <div className="input-group m-t-10">
          <MystSlider
            headerAmount={(v) => `${displayMystLongNoDecimal(v)}`}
            popover={(v) => `${displayMystLongNoDecimal(v)}`}
            label="Price per hour"
            value={state.pricePerHour}
            handleChange={handlePricePerHourChanged}
            step={PRICE_PER_HOUR_STEP}
            min={0}
            max={pricePerMinMaxRange}
            disabled={state.checked}
          />
        </div>
        <div className="input-group m-t-40">
          <MystSlider
            headerAmount={(v) => `${displayMystLongNoDecimal(v)}`}
            popover={(v) => `${displayMystLongNoDecimal(v)}`}
            label="Price per GiB"
            value={state.pricePerGiB}
            handleChange={handlePricePerGiBChanged}
            step={PRICE_PER_GIB_STEP}
            min={0}
            max={pricePerGbMaxRange}
            disabled={state.checked}
          />
        </div>
        <div className="input-group m-t-50 m-b-50">
          <Checkbox checked={state.checked} handleCheckboxChange={handleCheckboxChange} label="Use default pricing" />
        </div>
        <div className="step__content-buttons step__content-buttons--center">
          <Button onClick={handleSettingSetup}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default PriceSettings
