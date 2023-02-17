/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table'
import styled from 'styled-components'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { themeCommon } from '../../theme/themeCommon'
import zIndexes from '../../constants/z-indexes'
import { devices } from '../../theme/themes'
import { ComponentType, Fragment, ReactNode } from 'react'

interface TableBodyProps {
  $noContent: boolean
  $loading?: boolean
}
interface Props<Data> {
  loading?: boolean
  data: Data[]
  columns: ColumnDef<Data>[]
  noContent?: ReactNode
  rowProvider?: (row: Row<Data>) => ComponentType<any> | undefined
}
const Container = styled.table`
  width: 100%;
  display: table;
  border-collapse: separate;
  padding: 0 20px 24px 20px;
  background-color: ${({ theme }) => theme.table.bgBody};
  border-spacing: 0 5px;
  border-radius: 20px;
  position: relative;
`
const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: ${zIndexes.spinner};
`
const Overlay = styled.div`
  position: absolute;
  z-index: ${zIndexes.overlay};
  left: 0;
  top: 0;
  width: 100%;
  min-height: 400px;
  height: 100%;
  background-color: ${themeCommon.colorDarkBlue}6A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${devices.tablet} {
    min-height: 200px;
  }
`
const HeaderRow = styled.tr``
const Header = styled.th`
  padding-bottom: 15px;
  padding-top: 10px;
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
`
const Body = styled.tbody<TableBodyProps>`
  min-width: fit-content;
  min-height: fit-content;
`
const RowStyled = styled.tr`
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.table.bgRowOdd};
  }
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.table.bgRowEven};
  }
  :hover {
    background-color: ${({ theme }) => theme.table.bgRowHover};
  }
  td:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
const PlaceholderRow = styled.tr`
  background-color: ${({ theme }) => theme.table.bgBody};
  td:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
const Cell = styled.td`
  padding: 20px 5px;
  white-space: nowrap;
`
const TableSpinner = () => (
  <Overlay>
    <Spinner />
  </Overlay>
)

export const Table = <Data extends unknown>({ data, columns, noContent, rowProvider, loading }: Props<Data>) => {
  const table = useReactTable<Data>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const showNoContent = data.length === 0 && !loading
  return (
    <Container>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <HeaderRow key={`headerGroup-${headerGroup.id}`}>
            {headerGroup.headers.map((header) => (
              <Header key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Header>
            ))}
          </HeaderRow>
        ))}
      </thead>
      <Body $noContent={showNoContent} $loading={loading}>
        {table.getRowModel().rows.map((row) => {
          const providedRow = rowProvider && rowProvider(row)
          const ResolvedRow = providedRow ?? RowStyled

          return (
            <Fragment key={row.id}>
              <ResolvedRow key={`row-${row.id}`}>
                {row.getVisibleCells().map((cell) => (
                  <Cell
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                        minWidth: `${cell.column.columnDef.minSize}px`,
                        maxWidth: `${cell.column.columnDef.maxSize}px`,
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </ResolvedRow>
            </Fragment>
          )
        })}
        {showNoContent && (
          <PlaceholderRow>
            <td colSpan={10}>{noContent}</td>
          </PlaceholderRow>
        )}
      </Body>
      {loading && (
        <PlaceholderRow>
          <Cell colSpan={10}>
            <TableSpinner />
          </Cell>
        </PlaceholderRow>
      )}
    </Container>
  )
}
