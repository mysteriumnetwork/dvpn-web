/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequila } from '../api/tequila'
import { useFetch } from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import { ReactNode } from 'react'
import styled from 'styled-components'

const { api } = tequila

interface Props {
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  align-items: center;
  text-align: center;
`

const SadMessage = styled.h1`
  width: 100%;
`

export const NodeHealthcheckBarrier = ({ children }: Props) => {
  const [, loading, error] = useFetch(() => api.healthCheck(), [])

  if (loading) {
    return <FullPageSpinner />
  }

  if (error) {
    return (
      <Container>
        <SadMessage>Looks like your node is unreachable... ☹️😭</SadMessage>
      </Container>
    )
  }

  return <>{children}</>
}
