/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React from 'react'
import { pricePerGbMax, pricePerMinMax, defaultPricePerGb, defaultPricePerMin } from '../../../commons/config'

import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import MystSlider from '../../../Components/MystSlider/MystSlider'
import { setAllServicePrice } from '../../../api/TequilAPIWrapper'
import { PRICE_PER_GB_STEP, PRICE_PER_MINUTE_STEP } from '../../../constants/defaults'
import Button from '../../../Components/Buttons/Button'
import { displayMystLongNoDecimal, displayMystNoDecimal } from '../../../commons/money.utils'

interface StateInterface {
  checked: boolean
  pricePerMinute: number
  pricePerGb: number
}

const PriceSettings = ({ config, callbacks }: { config: Config; callbacks: OnboardingChildProps }): JSX.Element => {
  const pricePerMinMaxRange = pricePerMinMax(config)
  const pricePerGbMaxRange = pricePerGbMax(config)

  const [state, setState] = React.useState<StateInterface>({
    checked: false,
    pricePerMinute: defaultPricePerMin(config),
    pricePerGb: defaultPricePerGb(config),
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      checked: event.target.checked,
      pricePerMinute: defaultPricePerMin(config),
      pricePerGb: defaultPricePerGb(config),
    })
  }

  const handlePricePerMinuteChanged = (event: any, newValue: number) => {
    setState({
      ...state,
      pricePerMinute: newValue,
    })
  }

  const handlePricePerGbChanged = (event: any, newValue: number) => {
    setState({
      ...state,
      pricePerGb: newValue,
    })
  }

  const handleSettingSetup = () => {
    setAllServicePrice(state.pricePerMinute, state.pricePerGb).then(() => callbacks.nextStep())
  }

  return (
    <div className="step">
      <h1 className="step__title">Service price settings</h1>
      <p className="step__description">Fill in the following information to start running a VPN service.</p>
      <div className="step__content m-t-100">
        <div className="input-group m-t-10">
          <MystSlider
            headerAmount={(v) => `${displayMystLongNoDecimal(v * 60)}`}
            popover={(v) => `${displayMystLongNoDecimal(v * 60)}`}
            label="Price per hour"
            value={state.pricePerMinute}
            handleChange={handlePricePerMinuteChanged}
            step={PRICE_PER_MINUTE_STEP}
            min={0}
            max={pricePerMinMaxRange}
            disabled={state.checked}
          />
        </div>
        <div className="input-group m-t-40">
          <MystSlider
            headerAmount={(v) => `${displayMystNoDecimal(v)}`}
            popover={(v) => `${displayMystNoDecimal(v)}`}
            label="Price per GB"
            value={state.pricePerGb}
            handleChange={handlePricePerGbChanged}
            step={PRICE_PER_GB_STEP}
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
