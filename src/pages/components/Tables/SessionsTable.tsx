/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { ColumnDef } from '@tanstack/react-table'
import { SessionV2 } from 'mysterium-vpn-js'
import { sessionsColumns } from './sessionsColumns'
import ExpandedSessionRow from './ExpandedSessionRow'
import { Table, TableProps } from '../../../components/Table/Table'
import { useStores } from '../../../mobx/store'

export type ColumnsSet = 'desktop' | 'mobile'

type Props = {
  readonly columnsSet: ColumnsSet
} & Omit<TableProps<SessionV2>, 'columns'>

const SessionsTable = observer(({ columnsSet, ...props }: Props) => {
  const { sessionsStore } = useStores()

  useEffect(() => {
    sessionsStore.fetchSessions()
  }, [])

  const allColumns: ColumnDef<SessionV2>[] = useMemo(() => sessionsColumns(), [])

  const columns: ColumnDef<SessionV2>[] = useMemo(() => {
    switch (columnsSet) {
      case 'desktop':
        return allColumns.filter((c) => c.id !== 'Actions')
      case 'mobile':
        const mobileColumns = allColumns.filter((c) => ['Country', 'Duration', 'Actions'].includes(c.id!))
        mobileColumns.forEach((c) => {
          if (c.id === 'Actions') {
            c.size = 0
          }
        })
        return mobileColumns
    }
  }, [columnsSet, allColumns])

  return (
    <Table
      noContentLabel="No sessions in your history yet"
      columns={columns}
      loading={sessionsStore.loading}
      getRowCanExpand={() => true}
      renderSubComponent={(props) => (
        <ExpandedSessionRow {...props} className="border border-transparent border-b-white-125 rounded-3xl pb-4" />
      )}
      {...props}
    />
  )
})

export default SessionsTable
