/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useTable, useFlexLayout, Column } from 'react-table'

import styled from 'styled-components'
interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
}
export const PrimaryCell = styled.div`
  color: ${({ theme }) => theme.table.textColorPrimary};
  padding: 1em;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  font-weight: 600;
  text-align: center;
`
export const SecondaryCell = styled.div`
  color: ${({ theme }) => theme.table.textColorSecondary};
  padding: 1em;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 400;
  text-align: center;
`
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
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.table.bgBody};
  padding: 16px 20px 24px 20px;
  border-radius: 20px;
  gap: 5px;
`
export const Table = ({ columns, data }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { data, columns },
    useFlexLayout,
  )
  return (
    <Container {...getTableProps()}>
      <HeaderRow>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Header {...column.getHeaderProps()}>{column.render('Header')}</Header>
            ))}
          </div>
        ))}
      </HeaderRow>
      <Body {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <div {...cell.getCellProps()}>{cell.render('Cell')}</div>
              })}
            </Row>
          )
        })}
      </Body>
    </Container>
  )
}
