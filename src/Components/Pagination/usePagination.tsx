/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo } from 'react'

export const DOTS_L = '...L'
export const DOTS_R = '...R'

const range = (start: number, end: number) => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
interface Props {
  totalPages: number
  siblingCount?: number
  currentPage: number
}
export const usePagination = ({ totalPages, siblingCount = 1, currentPage }: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 2 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS_L, totalPages]
    }
    if (showLeftDots && !showRightDots) {
      let rightItemCount = 2 + 2 * siblingCount
      let rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, DOTS_L, ...rightRange]
    }
    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS_L, ...middleRange, DOTS_R, lastPageIndex]
    }
  }, [totalPages, currentPage])

  return paginationRange
}
