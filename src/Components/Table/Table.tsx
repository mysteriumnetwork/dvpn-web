/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useTable, useFlexLayout, Column } from 'react-table'
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { devices } from '../../theme/themes'
import { ReactNode } from 'react'
import zIndexes from '../../constants/z-indexes'

interface Props {
  columns: Column<any>[]
  data: any[]
  loading?: boolean
  noContent?: ReactNode
  ongoing?: boolean
}

const Container = styled.div`
  width: 100%;
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
  min-height: 550px;
  height: 100%;
  background: ${themeCommon.colorDarkBlue}6A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${devices.tablet} {
    min-height: 200px;
  }
`
const HeaderRow = styled.div`
  padding: 20px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  width: 10%;
  gap: 5px;
`
const Row = styled.div<RowProps>`
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 5px;
  background-color: ${({ $ongoing, theme }) => $ongoing && theme.table.bgRowOngoing};
  border-radius: 10px;
  &:nth-of-type(odd) {
    background-color: ${({ $ongoing, theme }) => !$ongoing && theme.table.bgRowOdd};
  }
  &:nth-of-type(even) {
    background-color: ${({ $ongoing, theme }) => !$ongoing && theme.table.bgRowEven};
  }
  :hover {
    background-color: ${({ $ongoing, theme }) => ($ongoing ? theme.table.bgRowOngoingHover : theme.table.bgRowHover)};
  }
`

interface TableProps {
  $noContent: boolean
  $loading?: boolean
}
interface RowProps {
  $ongoing?: boolean
}
const Body = styled.div<TableProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ $noContent }) => ($noContent ? 'center' : '')};
  justify-content: ${({ $noContent }) => ($noContent ? 'center' : '')};
  background-color: ${({ theme }) => theme.table.bgBody};
  padding: 16px 20px 24px 20px;
  border-radius: 20px;
  min-height: ${({ $noContent, $loading }) => ($noContent || $loading ? '550px' : '')};
  gap: 5px;
  min-width: fit-content;
`
const TableSpinner = () => (
  <Overlay>
    <Spinner />
  </Overlay>
)
export const Table = ({ columns, data, loading, noContent, ongoing }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { data, columns },
    useFlexLayout,
  )
  const showSpinner = loading
  const showNoContent = data.length === 0 && !loading
  return (
    <Container {...getTableProps()}>
      <HeaderRow data-test-id="HistoryPage.tableHeader">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Header {...column.getHeaderProps()}>{column.render('Header')}</Header>
            ))}
          </div>
        ))}
      </HeaderRow>

      <Body $noContent={showNoContent} $loading={loading} {...getTableBodyProps()}>
        {showNoContent && noContent}
        {showSpinner && <TableSpinner />}
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Row $ongoing={ongoing} {...row.getRowProps()}>
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
