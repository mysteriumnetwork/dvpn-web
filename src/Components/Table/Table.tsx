/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useTable, useFlexLayout, Column } from 'react-table'
import styled from 'styled-components'
import { devices } from '../../theme/themes'

interface Props {
  columns: Column<any>[]
  data: any[]
  loading?: boolean
  isDesktop?: boolean
}

const Container = styled.div`
  width: 100%;
`
const HeaderRow = styled.div`
  padding: 20px;
`
const Header = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  width: 10%;
  text-align: center;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: 10px;
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.table.bgRowOdd};
  }
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.table.bgRowEven};
  }
  @media ${devices.tablet} {
    background-color: ${({ theme }) => theme.table.bgBody} !important;
    display: grid !important;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    border-radius: 30px;
    min-width: 350px;
    padding: 30px;
    overflow: hidden;
    grid-gap: 20px 10px;
  }
`
const Cell = styled.div`
  margin-right: 20px;
  &&&.grid-full {
    display: grid;
    grid-column: 1 / 3;
  }
  &&&.grid-half {
    display: grid;
    grid-column: 1 / 2;
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.table.bgBody};
  padding: 16px 20px 24px 20px;
  border-radius: 20px;
  gap: 5px;
  @media ${devices.tablet} {
    background: none !important;
    gap: 20px;
    padding: 0;
    min-width: 300px;
  }
`
export const Table = ({ columns, data, isDesktop }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { data, columns },
    useFlexLayout,
  )
  return (
    <Container {...getTableProps()}>
      {isDesktop && (
        <HeaderRow>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Header {...column.getHeaderProps()}>{column.render('Header')}</Header>
              ))}
            </div>
          ))}
        </HeaderRow>
      )}
      <Body {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Cell {...cell.getCellProps({ className: (cell.column as any).className })}>
                    {cell.render('Cell')}
                  </Cell>
                )
              })}
            </Row>
          )
        })}
      </Body>
    </Container>
  )
}
