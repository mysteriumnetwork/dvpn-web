/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CircularProgress } from '@material-ui/core'
import _ from 'lodash'
import { Money, PaymentGateway, PaymentOrder } from 'mysterium-vpn-js'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { tequila } from '../../../../../api/wrapped-calls'
import { countryNames } from '../../../../../commons/country'
import { money } from '../../../../../commons/money.utils'
import { parseToastError } from '../../../../../commons/toast.utils'
import Button from '../../../../../Components/Buttons/Button'
import { Item, RadioCard } from '../../../../../Components/RadioCard/RadioCard'
import { Option, Select } from '../../../../../Components/Select/Select'
import { selectors } from '../../../../../redux/selectors'
import styles from './Fiat.module.scss'
import { PAYPAL_GATEWAY, validateAndReturnCheckoutUrl } from './paypal'

const { api } = tequila

interface Props {
  mystReceived?: JSX.Element
  controls?: JSX.Element
  onClose?: () => void
  isRegistrationFeeReceived: boolean
}

interface State {
  taxCountry: Option
  currency: string
  paymentOrder?: PaymentOrder
  checkoutUrl: string
  isRedirected: boolean
  isLoading: boolean
  gateway: PaymentGateway
  rates: Money[]
  mystAmounts: { [key: string]: number }
}

const initialState: State = {
  taxCountry: { label: '', value: '' },
  currency: 'USD',
  checkoutUrl: '',
  isRedirected: false,
  isLoading: true,
  gateway: { currencies: [], name: '', orderOptions: { minimum: 0, suggested: [] } },
  rates: [],
  mystAmounts: {},
}
export const Fiat = ({ controls, mystReceived, onClose = () => {}, isRegistrationFeeReceived }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)

  const [state, setState] = useImmer<State>(initialState)
  const currencyOptions: Item[] = state.gateway.currencies.map((c) => ({ value: c, label: c }))
  const countryOptions = useMemo(
    () => Object.keys(countryNames).map((key) => ({ value: key.toUpperCase(), label: countryNames[key] })),
    [],
  )

  useEffect(() => {
    const init = async () => {
      try {
        const [gateways, location] = await Promise.all([api.payment.gateways(), api.location()])
        const currentLocation = countryOptions.find((lo) => lo.value === location.country)
        if (!currentLocation) {
          throw new Error('Current location is unavailable for payment')
        }

        const gateway = gateways.find((it) => it.name === PAYPAL_GATEWAY)
        if (!gateway) {
          throw new Error('Could not fetch gateway information')
        }

        const rates = await Promise.all(
          gateway.currencies.map((c) => api.exchangeRate(c).catch(() => ({ currency: c, amount: 0 } as Money))),
        )

        setState((d) => {
          d.mystAmounts = _.chain(
            rates.map((r) => ({ currency: r.currency, myst: money.flooredAmount(1 / r.amount, 2) })),
          )
            .keyBy('currency')
            .mapValues('myst')
            .value()
          d.rates = rates
          d.taxCountry = currentLocation
          d.gateway = gateway
          d.isLoading = false
        })
      } catch (err) {
        parseToastError(err)
      }
    }
    init()
  }, [])

  const redirected = () => {
    setState((d) => {
      d.isRedirected = true
    })
  }
  const currencyChange = (c: string) =>
    setState((d) => {
      d.currency = c
    })
  const taxCountryChange = (c: Option) => {
    if (c) {
      setState((d) => {
        d.taxCountry = c
      })
    }
  }

  const createOrder = async () => {
    try {
      const country = state.taxCountry.value as string
      const order = await api.payment.createOrder(identity.id, PAYPAL_GATEWAY, {
        payCurrency: state.currency,
        country,
        mystAmount: `${state.mystAmounts[state.currency]}`,
        gatewayCallerData: {},
      })

      const checkoutUrl = validateAndReturnCheckoutUrl(order)

      if (!checkoutUrl) {
        throw new Error('Paypal checkout URL not provided')
      }

      setState((d) => {
        d.paymentOrder = order
        d.checkoutUrl = checkoutUrl
      })
      openInNewTab(checkoutUrl)
      redirected()
    } catch (err) {
      parseToastError(err)
    }
  }

  if (state.isLoading) {
    return <CircularProgress />
  }

  const showRegistrationControls = state.isRedirected || isRegistrationFeeReceived
  return (
    <div className={styles.fiat}>
      <p className={styles.note}>
        <PriceInfo rates={state.rates} mystAmounts={state.mystAmounts} />
      </p>
      <p className={styles.note}>
        <UsageTip />
      </p>
      {!showRegistrationControls && (
        <>
          <div className={styles.currency}>
            <RadioCard items={currencyOptions} value={state.currency} onChange={currencyChange} />
          </div>
          <div className={styles.country}>
            <Select
              options={countryOptions}
              value={state.taxCountry}
              onChange={(v) => taxCountryChange(v as Option)}
              placeholder="Residence TAX Country"
            />
          </div>
        </>
      )}
      {showRegistrationControls && (
        <>
          <div className={styles.received}>{mystReceived}</div>
          {isRegistrationFeeReceived && (
            <div className={styles.invoice}>
              <DownloadInvoice id={identity.id} orderId={state.paymentOrder?.id} />
            </div>
          )}
          <div className={styles.controls}>{controls}</div>
        </>
      )}
      {!showRegistrationControls && (
        <div className={styles.controls}>
          <Button extraStyle="gray" onClick={onClose}>
            Back
          </Button>
          <Button
            onClick={async () => {
              await createOrder()
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank')
  win?.focus()
}

const DownloadInvoice = ({ id, orderId }: { id: string; orderId?: string }) => {
  const { api } = tequila

  const [url, setUrl] = useState<string>()
  const [name, setName] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const generate = async () => {
      try {
        const data = await api.payment.invoice(id, orderId!)
        const blob = new Blob([data], { type: 'application/pdf' })
        if (url && url !== '') {
          window.URL.revokeObjectURL(url)
        }
        setUrl(window.URL.createObjectURL(blob))
        setName(`MysteriumVPN-order-${orderId}.pdf`)
      } catch (err) {
        parseToastError(err)
      }
    }
    if (orderId) {
      setIsLoading(true)
      generate()
      setIsLoading(false)
    }
  }, [id, orderId])

  return (
    <a download={name} href={url} style={{ display: isLoading ? 'none' : undefined }}>
      Download Invoice
    </a>
  )
}

const PriceInfo = ({ rates, mystAmounts }: { rates: Money[]; mystAmounts: { [key: string]: number } }) => {
  const amounts = rates.map((r) => `1 ${r.currency} (${mystAmounts[r.currency]} MYST)`).join(' / ')
  return <>Minimum amount {amounts} plus applicable VAT.</>
}

const UsageTip = () => (
  <>
    Note: After clicking NEXT below, new tab/window will be opened and you will be redirected to Paypal to complete
    transaction. Please be patient, it might take a few minutes for MYST to arrive after a successful payment card
    transaction.
  </>
)
