/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { alphaToHex } from '../../theme/themeCommon'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

const Container = styled.div`
  width: 100%;
`
const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
`
const Header = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  text-align: left;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: 10px;
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => `${theme.common.colorLightBlue}${alphaToHex(0.2)}`};
  }
  &:nth-of-type(even) {
    background-color: ${({ theme }) => `${theme.common.colorLightBlue}${alphaToHex(0.5)}`};
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgHistoryTable};
  padding: 20px;
  border-radius: 20px;
  gap: 5px;
`
interface Props {
  columns: any[]
  data: any[]
  loading?: boolean
}
export const Table = ({ columns, data }: Props) => {
  const tableInstance = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <Container>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <HeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Header key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Header>
          ))}
        </HeaderRow>
      ))}
      <Body>
        {tableInstance.getRowModel().rows.map((row) => (
          <Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
            ))}
          </Row>
        ))}
      </Body>
    </Container>
  )
}
