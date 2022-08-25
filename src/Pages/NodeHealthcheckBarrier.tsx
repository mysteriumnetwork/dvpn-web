/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequila } from '../api/tequila'
import { useAppDispatch, useFetch } from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { HEALTHCHECK_EMPTY } from '../constants/instances'
import { updateHealthCheckResponseStore } from '../redux/app.slice'

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
  const dispatch = useAppDispatch()
  const [healthCheckResponse = HEALTHCHECK_EMPTY, loading, error] = useFetch(() => api.healthCheck(), [])

  useEffect(() => {
    if (!loading) {
      dispatch(updateHealthCheckResponseStore(healthCheckResponse))
    }
  }, [loading])

  if (loading) {
    return <FullPageSpinner />
  }

  if (error) {
    return (
      <Container>
        <SadMessage>Looks like your node is unreachable... 😭</SadMessage>
      </Container>
    )
  }

  return <>{children}</>
}
