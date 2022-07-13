/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AVAILABLE_SERVICES } from '../../../../constants/service'
import { ServiceCard } from './ServiceCard'

export const Services = () => {
  return (
    <>
      {AVAILABLE_SERVICES.map((sd) => (
        <ServiceCard name={sd.name} description={sd.description} serviceType={sd.key} />
      ))}
    </>
  )
}
