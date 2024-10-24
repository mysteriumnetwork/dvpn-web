/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { selectors } from '../redux/selectors'
import { configs } from './config'
import { Feature } from './features'

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
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, refetch]
}

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useIsFeatureEnabled = (feature: Feature) => {
  const config = useAppSelector(selectors.currentConfig)
  return configs.isFeatureEnabled(config, feature.name)
}

export const useKeyAction = ({ key, action }: { key: string; action?: () => void }) => {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === key) {
      action && action()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}

export const useScrollLock = (state: boolean) => {
  const toggleScrollLock = (state: boolean) => {
    document.querySelector('html')?.classList[state ? 'add' : 'remove']('overflow-hidden')
  }

  useEffect(() => {
    toggleScrollLock(state)
  }, [state])

  useEffect(() => {
    return () => {
      toggleScrollLock(false)
    }
  }, [])

  return { toggleScrollLock }
}
