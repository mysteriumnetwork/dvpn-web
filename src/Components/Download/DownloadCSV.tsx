/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../Buttons/Button'
import errors from '../../commons/errors'
import { useState } from 'react'

const { parseToastError } = errors

interface Props<T> {
  fetchData: () => Promise<T> | undefined
  mapper: (data: T) => string
  disabled?: boolean
}

interface State {
  isLoading: boolean
  downloadLink: string
}

export const DownloadCSV = <T extends unknown>({ fetchData, mapper, disabled }: Props<T>) => {
  const [state, setState] = useState<State>({
    isLoading: true,
    downloadLink: '',
  })

  const setIsLoading = (b: boolean = true) => setState((d) => ({ ...d, isLoading: b }))

  const handleDownload = async () => {
    try {
      setIsLoading()
      const response = await fetchData()

      if (!response) {
        throw new Error('Unable to Download CSV: fetch data response is empty')
      }

      const csv = mapper(response)
      const data = new Blob([csv], { type: 'application/csv' })

      if (state.downloadLink === '') {
        window.URL.revokeObjectURL(state.downloadLink)
      }

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(data)
      link.setAttribute('download', `settlement_history_${new Date().getTime()}.csv`)
      document.body.append(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (err) {
      parseToastError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return <Button disabled={disabled} onClick={handleDownload} extraStyle="outline" />
}
