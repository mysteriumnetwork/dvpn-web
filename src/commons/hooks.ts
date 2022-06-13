/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import { parseToastError } from './errors'

export const useFetch = <T>(
  fetch: () => Promise<T>,
  deps: ReadonlyArray<unknown> = [],
): [T | undefined, boolean, any, () => void] => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  const [data, setData] = useState<T>()

  useEffect(() => {
    refetch()
  }, deps)

  const refetch = async () => {
    setLoading(true)
    setError(undefined)
    try {
      const response = await fetch()
      setData(response)
    } catch (err: any) {
      setError(err)
      parseToastError(err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, refetch]
}
