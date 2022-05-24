/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequila } from '../api/wrapped-calls'
import hooks from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import styles from './NodeHealthcheckBarrier.module.scss'

const { useFetch } = hooks
const { api } = tequila

interface Props {
  children: JSX.Element
}

export const NodeHealthcheckBarrier = ({ children }: Props) => {
  const [response, loading, error] = useFetch(() => api.healthCheck(), [])

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

  return children
}
