/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { useState } from 'react'
import { Settlement } from 'mysterium-vpn-js'
import Button, { ButtonProps } from '../../../components/Buttons/Button'
import toasts from '../../../commons/toasts'
import { settlementsToCsv } from '../../../commons/csv'
import { tequila } from '../../../api/tequila'

const { api } = tequila

const DownloadTransactionsButton = (props: ButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const fetchAllPages = async (): Promise<Settlement[]> => {
    let allData: Settlement[] = []
    let currentPage = 1
    let totalPages = 1

    while (currentPage <= totalPages) {
      const response = await api.settlementHistory({ page: currentPage })
      allData = [...allData, ...response.items]
      totalPages = response.totalPages
      currentPage += 1
    }

    return allData
  }

  const handleDownload = async () => {
    if (isDownloading) {
      return
    }

    try {
      setIsDownloading(true)

      const allData = await fetchAllPages()

      if (allData.length === 0) {
        console.error('Unable to Download CSV: fetch data response is empty')
        toasts.toastInfo('No settlement history')
        setIsDownloading(false)
        return
      }

      const csv = settlementsToCsv(allData)
      const generatedData = new Blob([csv], { type: 'text/csv' })

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(generatedData)
      link.setAttribute('download', `settlement_history_${new Date().getTime()}.csv`)
      document.body.append(link)
      link.click()

      window.URL.revokeObjectURL(link.href)
      link.remove()
    } catch (error) {
      console.error('Error downloading CSV:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      label="Download CSV"
      variant="secondary-outlined"
      disabled={isDownloading}
      onClick={handleDownload}
      {...props}
    />
  )
}

export default DownloadTransactionsButton
