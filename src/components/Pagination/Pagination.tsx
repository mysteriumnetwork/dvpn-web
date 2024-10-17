/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { usePagination, DOTS_R, DOTS_L } from './usePagination'
import Button from '../Buttons/Button'

type Props = {
  readonly currentPage: number
  readonly totalPages: number
  readonly handlePageChange: (page: number) => void
}

export const Pagination = ({ currentPage: page, totalPages, handlePageChange }: Props) => {
  const paginationRange =
    usePagination({
      totalPages: totalPages,
      currentPage: page,
    }) || []

  return (
    <div
      className={twMerge(
        'flex justify-center gap-2 sm:gap-3 my-3',
        paginationRange.length > 4 && paginationRange.length < 7 && 'flex-wrap min-[490px]:flex-nowrap justify-between',
        paginationRange.length === 7 && 'flex-wrap min-[880px]:flex-nowrap justify-between',
      )}
    >
      <div className={twMerge('flex gap-2 lg:gap-3 order-1', paginationRange.length > 4 && 'justify-start pl-2')}>
        {totalPages > 4 && (
          <Button
            shape="square"
            variant="primary-outlined"
            icon={<FontAwesomeIcon icon={faAnglesLeft} size="xl" />}
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          />
        )}
        <Button
          shape="square"
          variant="primary-outlined"
          icon={<FontAwesomeIcon icon={faAngleLeft} size="xl" />}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
      </div>
      <div
        className={twMerge(
          'flex gap-1 sm:gap-2 w-full justify-center order-2',
          paginationRange.length > 4 && paginationRange.length < 7 && 'order-first min-[490px]:order-2',
          paginationRange.length === 7 && 'order-first min-[880px]:order-2',
        )}
      >
        {paginationRange.map((p, index) => (
          <Button
            key={`${index}-x`}
            shape="square"
            variant="outlined"
            active={page === p}
            className={twMerge(page === p && 'cursor-default')}
            label={[DOTS_R, DOTS_L].includes(p as string) ? '...' : p.toString()}
            onClick={() => typeof p === 'number' && handlePageChange(p)}
            disabled={[DOTS_R, DOTS_L].includes(p as string)}
          />
        ))}
      </div>
      <div className={twMerge('flex gap-2 lg:gap-3 order-3', paginationRange.length > 4 && 'flex justify-end pr-2')}>
        <Button
          shape="square"
          variant="primary-outlined"
          icon={<FontAwesomeIcon icon={faAngleRight} size="xl" />}
          onClick={() => handlePageChange(page + 1)}
          disabled={totalPages === page}
        />
        {totalPages > 4 && (
          <Button
            shape="square"
            variant="primary-outlined"
            icon={<FontAwesomeIcon icon={faAnglesRight} size="xl" />}
            onClick={() => handlePageChange(totalPages)}
            disabled={totalPages === page}
          />
        )}
      </div>
    </div>
  )
}
