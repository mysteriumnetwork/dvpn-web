/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { useFetch } from '../../../../../commons/hooks'
import { tequila } from '../../../../../api/tequila'
import { NAT_TYPE_RESPONSE_EMPTY } from '../../../../../constants/instances'
import { CircularSpinner } from '../../../../../Components/CircularSpinner/CircularSpinner'

const { api } = tequila
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Description = styled.div`
  font-weight: 400;
  line-height: 14px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
`

type Variant = 'green' | 'red'

const Nat = styled.div<{ $variant?: Variant }>`
  font-weight: 400;
  font-size: 10px;
  background-color: ${({ theme, $variant }) =>
    $variant === 'red' ? theme.common.colorKeyLight : theme.common.colorGreen};
  color: ${({ theme }) => theme.common.colorWhite};
  padding: 7px;
  border-radius: 20px;
`

const Spinner = styled(CircularSpinner)`
  width: 10px;
  height: 10px;
`

export const NAT = () => {
  const [response = NAT_TYPE_RESPONSE_EMPTY, loading] = useFetch(() => api.natType())
  const natInfo = nat2Human(response.type)
  return (
    <Container>
      <Description>Accepting connections:</Description>
      <Nat $variant={loading ? undefined : natInfo.variant}>{loading ? <Spinner /> : natInfo.label}</Nat>
    </Container>
  )
}

interface NatHumanInfo {
  label: string
  variant: Variant
}

const nat2Human = (type: string): NatHumanInfo => {
  switch (type) {
    case 'none':
    case 'fullcone':
    case 'rcone':
      return { label: 'All', variant: 'green' }
    case 'prcone':
      return { label: 'Most', variant: 'green' }
    case 'symmetric':
      return { label: 'Limited', variant: 'red' }
    default:
      return { label: 'Unknown', variant: 'red' }
  }
}
