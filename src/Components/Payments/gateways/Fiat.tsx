/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import classNames from 'classnames'
import _ from 'lodash'
import { Money, PaymentOrder } from 'mysterium-vpn-js'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../api/wrapped-calls'
import { countryNames } from '../../../commons/country'
import { myst } from '../../../commons/myst.utils'
import { parseToastError } from '../../../commons/toast.utils'
import { selectors } from '../../../redux/selectors'
import Button from '../../Buttons/Button'
import { RadioCard } from '../../RadioCard/RadioCard'
import { Option, Select } from '../../Select/Select'
import { validateAndReturnCheckoutUrl } from './fiat'
import styles from './Fiat.module.scss'
import { GatewayProps } from './types'

const { api } = tequila

const PROJECT_ID = 'mystnodes'

const FIXED_FIAT_PRICE = myst.toBig(0.77)

interface State {
  fiatToMystEther: { [key: string]: string }
  currency: string
  taxCountry: Option
  isLoading: boolean
  isRedirected: boolean
  order?: PaymentOrder
  isLoadingPayNow: boolean
}

const initialState: State = {
  fiatToMystEther: {},
  currency: 'USD',
  taxCountry: { label: '', value: '' },
  isLoading: true,
  isRedirected: false,
  isLoadingPayNow: false,
}

const Fiat = ({ payments: { isCompleted }, gateway, note }: GatewayProps) => {
  const { currencies } = gateway

  const identity = useSelector(selectors.currentIdentitySelector)

  const [state, setState] = useState<State>(initialState)
  const { fiatToMystEther, currency, taxCountry, isLoading, isRedirected } = state

  const countryOptions = useMemo(
    () => Object.keys(countryNames).map((key) => ({ value: key.toUpperCase(), label: countryNames[key] })),
    [],
  )

  useEffect(() => {
    ;(async () => {
      try {
        const [location, orders] = await Promise.all([api.location(), api.payment.orders(identity.id)])
        const taxCountry = countryOptions.find((co) => co.value === location.country)
        if (!taxCountry) {
          throw new Error('Current location is unavailable for payment')
        }
        const rates = await Promise.all(
          currencies.map((c) => api.exchangeRate(c).catch(() => ({ currency: c, amount: 0 } as Money))),
        )

        setState((p) => ({
          ...p,
          taxCountry,
          order: orders.find((o) => o.status === 'new' && o.gatewayName === gateway.name),
          fiatToMystEther: _.chain(
            rates.map((r) => ({
              currency: r.currency,
              mystEther: FIXED_FIAT_PRICE.div(r.amount).toFixed(2),
            })),
          )
            .keyBy('currency')
            .mapValues('mystEther')
            .value(),
        }))
      } catch (e: any) {
        parseToastError(e)
      } finally {
        setState((p) => ({ ...p, isLoading: false }))
      }
    })()
  }, [])

  const markRedirected = () => setState((p) => ({ ...p, isRedirected: true }))
  const handleCurrencyChange = (currency: string) => setState((p) => ({ ...p, currency }))
  const handleTaxCountryChange = (taxCountry: Option) => setState((p) => ({ ...p, taxCountry }))

  const handlePayNow = async () => {
    try {
      setState((p) => ({ ...p, isLoadingPayNow: true }))
      const order = await createOrRetrieveOrder()
      const checkoutUrl = validateAndReturnCheckoutUrl(order, gateway.name)
      openInNewTab(checkoutUrl)
      markRedirected()
    } catch (err: any) {
      parseToastError(err)
    } finally {
      setState((p) => ({ ...p, isLoadingPayNow: false }))
    }
  }

  const createOrRetrieveOrder = async () => {
    if (state.order) {
      return state.order
    }

    const country = state.taxCountry.value as string
    const order = await api.payment.createOrder(identity.id, gateway.name, {
      payCurrency: state.currency,
      country,
      projectId: PROJECT_ID,
      mystAmount: `${fiatToMystEther[currency]}`,
      gatewayCallerData: {},
    })
    setState((p) => ({ ...p, order: order }))
    return order
  }

  const showInvoiceLink = isCompleted && state.order?.id
  const showPayNow = (): boolean => {
    if (isCompleted) {
      return false
    }

    if (isRedirected) {
      return false
    }

    return true
  }

  if (isLoading) {
    return (
      <div className={styles.content}>
        <CircularProgress className={styles.spinner} />
      </div>
    )
  }

  return (
    <div className={styles.content}>
      <p>
        You will be charged 1 USD/EUR/GBP plus applicable VAT. Please select your currency and country of residence
        below to proceed.
      </p>
      {note && <p>{note}</p>}
      <RadioCard
        items={gateway.currencies.map((c) => ({ value: c, label: c }))}
        value={currency}
        onChange={handleCurrencyChange}
      />
      <Select options={countryOptions} value={taxCountry} onChange={(o) => handleTaxCountryChange(o as Option)} />
      {showPayNow() && (
        <div className={styles.payNow}>
          <Button extraStyle="outline-primary" onClick={handlePayNow} isLoading={state.isLoadingPayNow}>
            Pay Now
          </Button>
        </div>
      )}
      <WaitingPayment showPayNow={showPayNow()} isRegistrationPaymentReceived={isCompleted} />
      {showInvoiceLink && <DownloadInvoice id={identity.id} orderId={state.order?.id} />}
    </div>
  )
}

interface WaitingPaymentProps {
  isRegistrationPaymentReceived: boolean
  showPayNow: boolean
}

const WaitingPayment = ({ isRegistrationPaymentReceived, showPayNow }: WaitingPaymentProps) => {
  if (showPayNow) {
    return <></>
  }
  return (
    <div className={styles.waitingPayment}>
      {isRegistrationPaymentReceived ? (
        <>Payment successful! Click Next to proceed.</>
      ) : (
        <div className={styles.waitingPaymentVerification}>
          Payment verification in progress (may take a few minutes)...
          <CircularProgress disableShrink />
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
        setName(`MystNodes-order-${orderId}.pdf`)
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
    <a download={name} href={url} className={classNames(styles.invoice, isLoading && styles.invoiceDisplayNonde)}>
      Download Invoice
    </a>
  )
}

export default Fiat
