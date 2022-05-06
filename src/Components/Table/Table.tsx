/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'

import styles from './Table.module.scss'
import './Pagination.mui.scss'
import { Column, Row, usePagination, useTable } from 'react-table'
import classNames from 'classnames'
import { Media } from '../../commons/media.utils'
import { CircularProgress } from '@material-ui/core'
import { Pagination } from './TableComponents'

interface Props {
  columns: Column[]
  mobileRow?: (row: Row<any>, index: number) => JSX.Element
  data: any[]
  onPaginationChange?: ({ pageSize, page }: { pageSize: number; page: number }) => void
  lastPage?: number
  loading: boolean
  noPagination?: boolean
  responsivePaging?: boolean
  noData?: JSX.Element
  pagination?: {
    pageSize?: number
  }
}

export interface PagingProps {
  pageSize: number
  page: number
}

const Table = ({
  columns,
  data,
  lastPage,
  loading = false,
  noPagination,
  mobileRow,
  responsivePaging,
  noData = (
    <div className={styles.empty}>
      <div className={styles.noData}>No Data</div>
    </div>
  ),
  pagination = { pageSize: 10 },
  onPaginationChange = () => {},
}: Props) => {
  const preparedMap = (page: Row<object>[], mapper: (row: Row, index: number) => JSX.Element) => {
    return page.map((row, index) => {
      prepareRow(row)
      return mapper(row, index)
    })
  }

  const desktopMap = (row: Row, index: number): JSX.Element => {
    prepareRow(row)
    return (
      <div className={styles.tableBodyRow} key={index}>
        {row.cells.map((cell) => {
          return (
            <div
              {...cell.getCellProps()}
              className={classNames(styles.tableBodyRowCell, cell.column.width ? `w-${cell.column.width}` : '')}
            >
              <>{cell.render('Cell')}</>
            </div>
          )
        })}
      </div>
    )
  }

  const {
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: columns,
      data: data,
      manualPagination: true,
      pageCount: lastPage,
      initialState: { pageIndex: 0, pageSize: pagination?.pageSize || 10 },
    },
    usePagination,
  )

  useEffect(() => {
    onPaginationChange({ pageSize, page: pageIndex + 1 })
  }, [pageIndex, pageSize])

  return (
    <div className={styles.table}>
      {loading && (
        <>
          <div className={styles.tableOverlay} />
          <CircularProgress className={styles.tableSpinner} disableShrink />
        </>
      )}
      <Media.Desktop>
        <div className={styles.tableDesktop}>
          <div>
            {headerGroups.map((headerGroup) => (
              <div className={styles.tableHeader} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className={classNames(styles.tableHeaderCell, `w-${column.width}`)}>
                    <>{column.render('Header')}</>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.tableBody}>{page.length > 0 ? preparedMap(page, desktopMap) : noData}</div>
        </div>
      </Media.Desktop>
      {mobileRow && (
        <Media.Mobile>
          <div className={styles.tableMobile}>{page.length > 0 ? preparedMap(page, mobileRow) : noData}</div>
        </Media.Mobile>
      )}
      {!mobileRow && (
        <Media.Mobile>
          <div>No Mobile View</div>
        </Media.Mobile>
      )}
      {!noPagination && (
        <Pagination
          page={pageIndex + 1}
          pageCount={pageCount}
          onChange={(page) => gotoPage(page - 1)}
          canNext={canNextPage}
          onNext={nextPage}
          canPrevious={canPreviousPage}
          onPrevious={previousPage}
          responsive={responsivePaging}
        />
      )}
    </div>
  )
}

export default Table
