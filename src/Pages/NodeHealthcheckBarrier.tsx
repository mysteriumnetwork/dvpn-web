/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequila } from '../api/tequila'
import { useFetch } from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import styles from './NodeHealthcheckBarrier.module.scss'
import { ReactNode } from 'react'

const { api } = tequila

interface Props {
  children: ReactNode
}

export const NodeHealthcheckBarrier = ({ children }: Props) => {
  const [, loading, error] = useFetch(() => api.healthCheck(), [])

  if (loading) {
    return <FullPageSpinner />
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.message}>Looks like your node is unreachable... ☹️😭</h1>
      </div>
    )
  }

  return <>{children}</>
}
