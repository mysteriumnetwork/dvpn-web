/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentGateway } from 'mysterium-vpn-js'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { tequila } from '../../api/wrapped-calls'
import { currentCurrency } from '../../commons/money.utils'
import { toastError } from '../../commons/toast.utils'
import { FullPageSpinner } from '../../Pages/Authenticated/Components/Spinner/FullPageSpinner'
import { Option, Radio } from '../Radio/Radio'
import { GatewayProps, PaymentProps } from './gateways/types'
import styles from './Payments.module.scss'

const { api } = tequila

const SUPPORTED_GATEWAYS: {
  [key: 'direct' | 'paypal' | string]: { summary: string; component: string }
} = Object.freeze({
  direct: {
    summary: `Deposit ${currentCurrency()} token`,
    component: 'Direct',
  },
  paypal: {
    summary: `Pay with PayPal (1 USD/EUR/GBP)`,
    component: 'PayPal',
  },
})

const DIRECT_GATEWAY_OPTION: Option = { value: 'direct', label: SUPPORTED_GATEWAYS.direct.summary }

interface State {
  gatewayOptions: Option[]
  checkedGateway: string
  isLoading: boolean
  gateways: PaymentGateway[]
}

export const Payments = (props: PaymentProps) => {
  const [state, setState] = useState<State>({
    gatewayOptions: [DIRECT_GATEWAY_OPTION],
    isLoading: true,
    checkedGateway: DIRECT_GATEWAY_OPTION.value,
    gateways: [],
  })

  useEffect(() => {
    ;(async () => {
      try {
        const gateways = await api.payment.gateways()
        const options: Option[] = gateways
          .filter((gw) => Object.keys(SUPPORTED_GATEWAYS).includes(gw.name))
          .map((gw) => ({ value: gw.name, label: SUPPORTED_GATEWAYS[gw.name].summary }))

        setState((p) => ({ ...p, gatewayOptions: [DIRECT_GATEWAY_OPTION, ...options], gateways }))
      } catch (e: any) {
        toastError('Could not retrieve payment gateways')
      } finally {
        setState((p) => ({ ...p, isLoading: false }))
      }
    })()
  }, [])

  const GatewayComponent = useMemo(
    () => React.lazy(() => import(`./gateways/${SUPPORTED_GATEWAYS[state.checkedGateway].component}`)),
    [state.checkedGateway],
  )

  const gatewayProps: GatewayProps = {
    gateway: state.gateways.find((gw) => gw.name === state.checkedGateway)!,
    payments: props,
  }

  return (
    <div className={styles.content}>
      <div className={styles.options}>
        {state.isLoading ? (
          <FullPageSpinner />
        ) : (
          <Radio
            options={state.gatewayOptions}
            checked={DIRECT_GATEWAY_OPTION.value}
            onChange={(value) => {
              setState((p) => ({ ...p, checkedGateway: value }))
            }}
          />
        )}
      </div>
      <div>
        <Suspense fallback={<div>Loading gateway...</div>}>
          <GatewayComponent {...gatewayProps} />
        </Suspense>
      </div>
    </div>
  )
}
