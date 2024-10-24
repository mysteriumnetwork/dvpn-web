/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fragment, ReactElement, ReactNode, useMemo } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table'
import Spinner from '../Spinner/Spinner'
import { twMerge } from 'tailwind-merge'

export type TableProps<T extends object> = {
  readonly loading?: boolean
  readonly data: T[]
  readonly columns: ColumnDef<T>[]
  readonly getRowCanExpand?: (row: Row<T>) => boolean
  readonly renderSubComponent?: (props: { row: Row<T> }) => ReactElement
  readonly noContentLabel?: ReactNode
}

export const Table = <T extends object>({
  data,
  columns,
  loading,
  getRowCanExpand,
  renderSubComponent,
  noContentLabel,
}: TableProps<T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand,
  })

  const isNoData = useMemo(() => data.length === 0 && !loading, [data.length, loading])

  return (
    <table className="w-full table-auto border-separate p-0 px-4 bg-white text-blue-850 border-spacing-0 border-spacing-y-4 rounded-3xl relative">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={`headerGroup-${headerGroup.id}`}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="pb-4 pt-5 text-sm md:text-base font-bold text-left pl-2 first:pl-4">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="min-w-fit min-h-fit">
        {table.getRowModel().rows.map((row, rowIndex, rows) => {
          return (
            <Fragment key={row.id}>
              <tr
                key={`row-${row.id}`}
                className={twMerge(
                  'cursor-default hover:bg-white-75 my-4 text-sm',
                  row.getIsExpanded()
                    ? 'bg-white-75 last:[&>td]:rounded-tr-3xl first:[&>td]:rounded-tl-3xl'
                    : 'last:[&>td]:rounded-r-3xl first:[&>td]:rounded-l-3xl',
                )}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={twMerge(
                      'py-3 whitespace-nowrap pl-2 first:pl-4 last:pr-4 border border-transparent border-b-white-125 xl:border-transparent',
                      rowIndex === rows.length - 1 && !row.getIsExpanded() && 'border-b-transparent',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && renderSubComponent ? (
                <tr key={row.id + '-expanded'}>
                  <td colSpan={columns.length}>{renderSubComponent({ row })}</td>
                </tr>
              ) : null}
            </Fragment>
          )
        })}
        {isNoData && (
          <tr className="h-[74px] rounded-md border-t-0 border-x-0 border-white-25 cursor-default">
            <td className="text-base text-center" colSpan={20}>
              {noContentLabel}
            </td>
          </tr>
        )}
        {loading && (
          <tr className="">
            <td className="py-3 whitespace-nowrap pl-2 first:px-3 [&:nth-child(2)]:pl-0 last:pr-4" colSpan={10}>
              <TableSpinner />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const TableSpinner = () => (
  <div className="absolute z-[10000] bg-white/40 backdrop-blur inset-0 flex justify-center items-center rounded-3xl">
    <Spinner size="4xl" />
  </div>
)

export default Table
