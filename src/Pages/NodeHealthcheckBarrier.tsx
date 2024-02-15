/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '../index.css'
import { tequila } from '../api/tequila'
import { useAppDispatch, useFetch } from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import { ReactNode, useEffect } from 'react'
import { HEALTHCHECK_EMPTY } from '../constants/instances'
import { updateHealthCheckResponseStore } from '../redux/app.slice'

const { api } = tequila

interface Props {
  children: ReactNode
}

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
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="md:text-3xl">Looks like your node is unreachable... 😭</div>
      </div>
    )
  }

  return <>{children}</>
}
