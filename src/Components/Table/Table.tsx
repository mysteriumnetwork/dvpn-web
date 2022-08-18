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

interface Props {
  columns: Column<any>[]
  data: any[]
  loading: boolean
  isDesktop?: boolean
  noContent: ReactNode
}

const Container = styled.div`
  width: 100%;
`

const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: 1001;
`
const Overlay = styled.div`
  position: absolute;
  z-index: 1000;
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
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  width: 10%;
  text-align: center;
`
const Row = styled.div`
  display: flex;
  position: relative;
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
interface TableProps {
  $noContent: boolean
  $loading: boolean
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
  @media ${devices.tablet} {
    background: ${({ $noContent }) => !$noContent && 'none'} !important;
    gap: 20px;
    padding: 0;
    min-width: 300px;
    min-height: ${({ $noContent, $loading }) => ($noContent || $loading ? '200px' : '')};
  }
`
const TableSpinner = () => (
  <Overlay>
    <Spinner />
  </Overlay>
)
export const Table = ({ columns, data, isDesktop, loading, noContent }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { data, columns },
    useFlexLayout,
  )
  const showSpinner = loading
  const showNoContent = data.length === 0 && !loading
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
      <Body $noContent={showNoContent} $loading={loading} {...getTableBodyProps()}>
        {showNoContent && noContent}
        {showSpinner && <TableSpinner />}
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
