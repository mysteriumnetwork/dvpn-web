/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { useAppSelector } from '../../../../../commons/hooks'
import { CircularSpinner } from '../../../../../Components/CircularSpinner/CircularSpinner'
import { CircleIndicator } from './CircleIndicator'
import { NATType } from './types'
import { NATTooltip } from './NATTooltip'
import { nat2Human } from './utils'
import { selectors } from '../../../../../redux/selectors'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px 8px 14px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.nat.bg};
  border-radius: 10px;
`

const Description = styled.div`
  line-height: 14px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.text.colorMain};
`

const Nat = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 700;
  font-size: 10px;
  padding: 7px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text.colorMain};
`

const Spinner = styled(CircularSpinner)`
  width: 10px;
  height: 10px;
`

const isLoading = (type: string, error?: string) => type === '' && error === ''

export const NAT = () => {
  const { type, error } = useAppSelector(selectors.natType)
  const natInfo = nat2Human(type)
  return (
    <Container>
      <Description>Accepting connections</Description>
      {isLoading(type, error) ? (
        <Spinner />
      ) : (
        <Nat>
          <CircleIndicator variant={natInfo.variant} size={18} />
          {natInfo.connectionAcceptance}
          <NATTooltip type={type as NATType} />
        </Nat>
      )}
    </Container>
  )
}
