/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../../redux/selectors'
import styles from './Fiat.module.scss'
import { useImmer } from 'use-immer'
import { countryNames } from '../../../../../commons/country'
import { tequila } from '../../../../../api/wrapped-calls'
import { parseToastError } from '../../../../../commons/toast.utils'
import { Money, PaymentGateway, PaymentOrder } from 'mysterium-vpn-js'
import { Item, RadioCard } from '../../../../../Components/RadioCard/RadioCard'
import { SelectV2, SelectV2Option } from '../../../../../Components/Select/SelectV2'
import Button from '../../../../../Components/Buttons/Button'
import { buildFormData, CARDINITY_GATEWAY, validateOrderAndReturnSecureForm } from './cardinity'
import { CircularProgress } from '@material-ui/core'
import { money } from '../../../../../commons/money.utils'
import _ from 'lodash'
import { configParser } from '../../../../../commons/config'

interface Props {
  mystReceived?: JSX.Element
  controls?: JSX.Element
  onClose?: () => void
  isRegistrationFeeReceived: boolean
}

interface State {
  taxCountry: SelectV2Option
  currency: string
  paymentOrder?: PaymentOrder
  formData: { [key: string]: any }
  isRedirected: boolean
  isLoading: boolean
  gateway: PaymentGateway
  rates: Money[]
  mystAmounts: { [key: string]: number }
}

const initialState: State = {
  taxCountry: { label: '', value: '' },
  currency: 'USD',
  formData: {},
  isRedirected: false,
  isLoading: true,
  gateway: { currencies: [], name: '', orderOptions: { minimum: 0, suggested: [] } },
  rates: [],
  mystAmounts: {},
}

export const Fiat = ({ controls, mystReceived, onClose = () => {}, isRegistrationFeeReceived }: Props) => {
  const { api } = tequila

  const config = useSelector(selectors.configSelector)
  const identity = useSelector(selectors.currentIdentitySelector)
  const [redirectRef, setRedirectRef] = useState<any>()

  const [state, setState] = useImmer<State>(initialState)

  const pilvytisUrl = configParser.pilvytisUrl(config)
  const currencyOptions: Item[] = state.gateway.currencies.map((c) => ({ value: c, label: c }))
  const countryOptions = useMemo(
    () =>
      Object.keys(countryNames).map(
        (key) => ({ value: key.toUpperCase(), label: countryNames[key] } as SelectV2Option),
      ),
    [],
  )

  useEffect(() => {
    if (redirectRef && state.paymentOrder && !state.isRedirected) {
      redirectRef.click()
    }
  }, [state.paymentOrder, redirectRef, state.isRedirected])

  useEffect(() => {
    const init = async () => {
      try {
        const [gateways, location] = await Promise.all([api.payment.gateways(), api.location()])
        const currentLocation = countryOptions.find((lo) => lo.value === location.country)
        if (!currentLocation) {
          throw new Error('Current location is unavailable for payment')
        }

        const gateway = gateways.find((it) => it.name === CARDINITY_GATEWAY)
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
  const taxCountryChange = (c?: SelectV2Option) => {
    if (c) {
      setState((d) => {
        d.taxCountry = c
      })
    }
  }

  const createOrder = async () => {
    try {
      const country = state.taxCountry.value
      const order = await api.payment.createOrder(identity.id, CARDINITY_GATEWAY, {
        payCurrency: state.currency,
        country,
        mystAmount: `${state.mystAmounts[state.currency]}`,
        gatewayCallerData: {
          country,
        },
      })

      const html = validateOrderAndReturnSecureForm(order)
      const data = buildFormData(html)

      if (!data) {
        throw new Error('Cardinity secure form not provided')
      }

      setState((d) => {
        d.paymentOrder = order
        d.formData = data
      })
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
            <SelectV2
              options={countryOptions}
              value={state.taxCountry}
              onChange={(v) => taxCountryChange(v)}
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

      <form
        name="checkout"
        method="POST"
        target="_blank"
        action="https://checkout.cardinity.com"
        onSubmit={() => redirected()}
      >
        <button style={{ display: 'none' }} ref={(input) => setRedirectRef(input)} type="submit">
          Hidden Redirect
        </button>
        <input type="hidden" name="amount" value={state.formData['amount']} />
        <input type="hidden" name="country" value={state.formData['country']} />
        <input type="hidden" name="currency" value={state.formData['currency']} />
        <input type="hidden" name="order_id" value={state.formData['order_id']} />
        <input type="hidden" name="project_id" value={state.formData['project_id']} />
        <input type="hidden" name="return_url" value={`${pilvytisUrl}/api/v2/payment/cardinity/redirect`} />
        <input type="hidden" name="signature" value={state.formData['signature']} />
      </form>
    </div>
  )
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
  return <>Minimum amount {amounts} plus applicable VAT. Unused MYST will be credited into your node's balance.</>
}

const UsageTip = () => (
  <>
    Note: After clicking NEXT below, new tab/window will be opened and you will be redirected to the 3rd party payment
    processor to complete transaction. Please be patient, it might take a few minutes for MYST to arrive after a
    successful payment card transaction.
  </>
)
