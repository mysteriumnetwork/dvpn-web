/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PaginationMaterial from '@material-ui/lab/Pagination'

import './Table.scss'
import Button from '../Buttons/Button'
import SessionCard from '../../Pages/Authenticated/Components/SessionCard/SessionCard'
import { Column, Row, usePagination, useTable } from 'react-table'

interface Props {
  columns: Column[]
  data: any[]
  fetchData: ({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => void
  lastPage: number
  loading: boolean
}

const noData = (
  <div className="empty">
    <div className="no-data">No Data</div>
  </div>
)

const Table = ({ columns, data, lastPage, loading = false, fetchData }: Props) => {
  const desktopRows = (row: Row, index: number): JSX.Element => {
    prepareRow(row)
    return (
      <div className="row" key={index}>
        {row.cells.map((cell) => {
          return (
            <div {...cell.getCellProps()} className={'cell ' + (cell.column.width ? 'w-' + cell.column.width : '')}>
              {cell.render('Cell')}
            </div>
          )
        })}
      </div>
    )
  }

  const mobileRows = (row: Row, index: number): JSX.Element => {
    const cells = row.cells
    return (
      <div className="table__mobile-row" key={index}>
        <SessionCard
          country={cells[0].value as string}
          onGoing={false}
          id={cells[5].value as string}
          time={cells[1].value as string}
          data={cells[4].value as string}
          value={cells[3].value as string}
        />
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
      initialState: { pageIndex: 0 },
    },
    usePagination,
  )

  React.useEffect(() => {
    fetchData({ pageIndex: pageIndex + 1, pageSize })
  }, [fetchData, pageIndex, pageSize])

  return (
    <div className="table">
      <div className="table__desktop">
        <div>
          {headerGroups.map((headerGroup) => (
            <div className="table__header" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className={'cell ' + (column.width ? 'w-' + column.width : '')}>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="table__body">{page.length > 0 ? page.map(desktopRows) : noData}</div>
      </div>
      <div className="table__mobile">{page.length > 0 ? page.map(mobileRows) : <p>No Sessions</p>}</div>
      <div className="table__footer">
        <Button
          className="prev table__footer__button prev pagination-button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <p>Prev</p>
        </Button>
        <div className="table__footer__pagination">
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
        <Button disabled={!canNextPage} className="next table__footer__button" onClick={() => nextPage()}>
          <p>Next</p>
        </Button>
      </div>
    </div>
  )
}

export default Table
