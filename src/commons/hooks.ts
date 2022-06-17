/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import errors from './errors'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

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
      errors.parseToastError(err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, refetch]
}

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
