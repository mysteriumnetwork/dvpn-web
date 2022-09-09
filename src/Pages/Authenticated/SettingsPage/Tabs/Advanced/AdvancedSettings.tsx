/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NATTraversalOrderCard } from './NATTraversalOrderCard'
import { devices } from '../../../../../theme/themes'
import styled from 'styled-components'
import { AdvancedSettingsCard } from './AdvancedSettingsCard'

const MobileMargin = styled.div`
  @media ${devices.tablet} {
    margin-bottom: 80px;
  }
`
export const AdvancedSettings = () => {
  return (
    <>
      <AdvancedSettingsCard />
      <NATTraversalOrderCard />
      <MobileMargin />
    </>
  )
}
