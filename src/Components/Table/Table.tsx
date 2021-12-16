/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PaginationMaterial from '@material-ui/lab/Pagination'

import styles from './Table.module.scss'
import './Pagination.mui.scss'
import Button from '../Buttons/Button'
import { Column, Row, usePagination, useTable } from 'react-table'
import classNames from 'classnames'
import { MobileRow } from './MobileRow'

interface Props {
  columns: Column[]
  mobileRow?: (row: Row<any>, index: number) => JSX.Element
  data: any[]
  fetchData: ({ pageSize, page }: { pageSize: number; page: number }) => void
  lastPage: number
  loading: boolean
  noData?: JSX.Element
  pagination?: {
    pageSize?: number
  }
}

const Table = ({
  columns,
  data,
  lastPage,
  loading = false,
  fetchData,
  mobileRow = (row: Row, index: number) => (
    <MobileRow
      topLeftSub="topLeftSub"
      topLeft="topLeft"
      topRight="topRight"
      bottomLeft="bottomLeft"
      bottomMiddle="bottomMiddle"
      bottomRight="bottomRight"
      topRightSub="topRightSub"
    />
  ),
  noData = (
    <div className={styles.empty}>
      <div className={styles.noData}>No Data</div>
    </div>
  ),
  pagination = { pageSize: 10 },
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
              className={classNames(styles.tableBodyRowCell, cell.column.width ? 'w-' + cell.column.width : '')}
            >
              {cell.render('Cell')}
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

  React.useEffect(() => {
    fetchData({ pageSize, page: pageIndex + 1 })
  }, [pageIndex, pageSize])

  return (
    <div className={styles.table}>
      <div className={styles.tableDesktop}>
        <div>
          {headerGroups.map((headerGroup) => (
            <div className={styles.tableHeader} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className={classNames(styles.tableHeaderCell, `w-${column.width}`)}>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>{page.length > 0 ? preparedMap(page, desktopMap) : noData}</div>
      </div>
      <div className={styles.tableMobile}>{page.length > 0 ? preparedMap(page, mobileRow) : noData}</div>
      <div className={styles.footer}>
        <Button className={styles.footerButton} onClick={() => previousPage()} disabled={!canPreviousPage}>
          <p>Prev</p>
        </Button>
        <div>
          <PaginationMaterial
            page={pageIndex + 1}
            disabled={loading}
            hideNextButton={true}
            hidePrevButton={true}
            count={pageCount}
            variant="outlined"
            shape="rounded"
            onChange={(_, page) => gotoPage(page - 1)}
          />
        </div>
        <Button disabled={!canNextPage} className={styles.footerButton} onClick={() => nextPage()}>
          <p>Next</p>
        </Button>
      </div>
    </div>
  )
}

export default Table
