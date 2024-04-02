/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import { useAppSelector } from '../commons/hooks'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'

export const StateLoadingBarrier = ({ children }: PropsWithChildren) => {
  const loading = useAppSelector(({ app }) => app.loading)

  if (loading) {
    return <FullPageSpinner />
  }

  return <>{children}</>
}
