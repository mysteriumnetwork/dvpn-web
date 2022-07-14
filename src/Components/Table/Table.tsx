/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useTable } from 'react-table'
import styled from 'styled-components'

interface Props {
  columns: any[]
  data: any[]
  loading?: boolean
}
const Container = styled.table`
  width: 90%;
  display: block;
  border-collapse: collapse;
  thead {
    width: 80%;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
  }
  th {
    color: ${({ theme }) => theme.common.colorGrayBlue};
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    padding: 1em 0 1em 0.75em;
  }
  tr {
    width: 100%;
  }
  tbody {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    padding: 1em;
    background-color: ${({ theme }) => theme.bgHistoryTable};
    box-shadow: ${({ theme }) => theme.bgReportChartRowBoxShadow};
    border-radius: 20px;
  }
  td {
    font-size: 10px;
    padding: 1em;
  }
`
export const Table = ({ columns, data }: Props) => {
  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <Container {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((column) => (
              <th {...column.getHeaderProps}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Container>
  )
}
