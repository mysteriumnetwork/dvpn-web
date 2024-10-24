/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../components/Layout/PageLayout'
import SessionsTable, { ColumnsSet } from '../../components/Tables/SessionsTable'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'
import { Pagination } from '../../../components/Pagination/Pagination'
import { useStores } from '../../../mobx/store'
import toasts from '../../../commons/toasts'
import { sessionsToCsv } from '../../../commons/csv'
import { useMediaQuery } from 'react-responsive'

const SessionsPage = observer(() => {
  const { sessionsStore } = useStores()
  const isXlScreen = useMediaQuery({ minWidth: 1280 })

  useEffect(() => {
    sessionsStore.fetchSessions()
  }, [])

  const sessionsTable = useCallback(
    (columnsSet: ColumnsSet) => {
      return (
        <SessionsTable
          columnsSet={columnsSet}
          data={sessionsStore.pagedSessions}
          getRowCanExpand={() => true}
          loading={sessionsStore.loading}
        />
      )
    },
    [sessionsStore.page, sessionsStore.totalPages],
  )

  const [isDownloading, setIsDownloading] = useState(false)

  const exportSessions = () => {
    if (isDownloading) {
      return
    }

    setIsDownloading(true)

    if (sessionsStore.noData) {
      console.error('Unable to Download CSV: fetch data response is empty')
      toasts.toastInfo('No sessions')
      setIsDownloading(false)
      return
    }

    const csv = sessionsToCsv(sessionsStore.sessions)
    const generatedData = new Blob([csv], { type: 'text/csv' })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(generatedData)
    link.setAttribute('download', `sessions_${new Date().getTime()}.csv`)
    document.body.append(link)
    link.click()

    window.URL.revokeObjectURL(link.href)
    link.remove()

    setIsDownloading(false)
  }

  return (
    <PageLayout wideContent={isXlScreen}>
      <Title value="Sessions" />
      <div className="flex justify-between">
        <Label value="List" className="text-pink-525 mb-4" />
        <div onClick={exportSessions}>
          <Label value="Export List" className="text-pink-525 mb-4 underline cursor-pointer" />
        </div>
      </div>
      <div className="hidden xl:block mb-6">{sessionsTable('desktop')}</div>
      <div className="xl:hidden -mx-[20px] min-[420px]:mx-0 mb-6">{sessionsTable('mobile')}</div>
      {!sessionsStore.noData && (
        <Pagination
          currentPage={sessionsStore.page}
          totalPages={sessionsStore.totalPages}
          handlePageChange={(p) => sessionsStore.setPage(p)}
        />
      )}
    </PageLayout>
  )
})

export default SessionsPage
