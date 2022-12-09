/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  ServiceEarningsKeys,
  serviceTypeToEarningPerServiceKey,
  serviceTypeToTotalNetworkEarningPerServiceKey,
  SUPPORTED_SERVICES,
} from '../../../../constants/service'
import { ServiceCard, ServiceEarnings } from './ServiceCard'
import { tequila } from '../../../../api/tequila'
import { useFetch } from '../../../../commons/hooks'
import { Prices } from './types'
import { PRICE_EMPTY } from './instances'
import { PRICE_EARNINGS_PER_SERVICE } from '../../../../constants/instances'
import { useMemo } from 'react'
import { myst } from '../../../../commons/mysts'

const { api } = tequila

export const Services = () => {
  const [prices = [], loadingPrices] = useFetch(() => api.pricesCurrentV2())
  const [earnings = PRICE_EARNINGS_PER_SERVICE, loadingEarnings] = useFetch(() => api.provider.earningsPerService())

  const findPrice = (serviceType: string): Prices => {
    const price = prices.find((p) => p.serviceType === serviceType)
    return price
      ? {
          pricePerGibWei: price.pricePerGibTokens.wei,
          pricePerHourWei: price.pricePerHourTokens.wei,
        }
      : PRICE_EMPTY
  }

  const totalEarningWei = useMemo(
    () =>
      myst
        .toBig(earnings.publicTokens.wei)
        .plus(earnings.dataTransferTokens.wei)
        .plus(earnings.scrapingTokens.wei)
        .toString(),
    [earnings.publicTokens.wei, earnings.dataTransferTokens.wei, earnings.scrapingTokens.wei],
  )

  const findEarnings = (serviceType: string): ServiceEarnings => {
    const earningKeys = Object.keys(earnings)
    const serviceEarningsKey = serviceTypeToEarningPerServiceKey(serviceType)
    const serviceTotalNetworkEarningsKey = serviceTypeToTotalNetworkEarningPerServiceKey(serviceType)

    // @ts-ignore
    const foundServiceEarnings: ServiceEarningsKeys | undefined = earningKeys.find((key) =>
      key === serviceEarningsKey ? key : undefined,
    )

    // @ts-ignore
    const foundTotalNetworkEarningsfoundTotalNetworkEarnings:
      | ServiceEarningsKeys
      | undefined = earningKeys.find((key) => (key === serviceTotalNetworkEarningsKey ? key : undefined))

    const serviceWei = foundServiceEarnings ? earnings[foundServiceEarnings].wei : 0
    const totalServiceNetworkWei = foundTotalNetworkEarningsfoundTotalNetworkEarnings
      ? earnings[foundTotalNetworkEarningsfoundTotalNetworkEarnings].wei
      : 0

    return { earningsWei: serviceWei, totalEarningWei, totalNetworkEarningsWei: totalServiceNetworkWei }
  }

  return (
    <>
      {SUPPORTED_SERVICES.map((sd) => (
        <ServiceCard
          loading={loadingPrices || loadingEarnings}
          dataTestId={sd.dataTestId}
          key={sd.type}
          name={sd.name}
          description={sd.description}
          serviceType={sd.type}
          prices={findPrice(sd.type)}
          earnings={findEarnings(sd.type)}
          tooltips={sd.tooltips}
        />
      ))}
    </>
  )
}
