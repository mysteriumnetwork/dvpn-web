/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SUPPORTED_SERVICES } from '../../../../constants/service'
import { ServiceCard } from './ServiceCard'
import { tequila } from '../../../../api/tequila'
import { useFetch } from '../../../../commons/hooks'
import { Prices } from './types'
import { PRICE_EMPTY } from './instances'

const { api } = tequila

export const Services = () => {
  const [prices = [], loadingPrices] = useFetch(() => api.pricesCurrentV2())

  const findPrice = (serviceType: string): Prices => {
    const price = prices.find((p) => p.serviceType === serviceType)
    return price
      ? {
          pricePerGibWei: price.pricePerGibTokens.wei,
          pricePerHourWei: price.pricePerHourTokens.wei,
        }
      : PRICE_EMPTY
  }

  return (
    <>
      {SUPPORTED_SERVICES.map((sd) => (
        <ServiceCard
          loading={loadingPrices}
          key={sd.type}
          name={sd.name}
          description={sd.description}
          serviceType={sd.type}
          prices={findPrice(sd.type)}
        />
      ))}
    </>
  )
}
