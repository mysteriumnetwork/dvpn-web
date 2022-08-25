/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { ReactNode, useId } from 'react'
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'
interface BodyProps {
  $noContent: boolean
  $loading?: boolean
}
interface Props<T> {
  items: T[]
  mapper: (item: T) => ReactNode
  loading?: boolean
  noContent?: ReactNode
}
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
const ListBody = styled.div<BodyProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: ${({ $noContent, theme }) => ($noContent ? theme.table.bgBody : 'none')} !important;
  gap: 20px;
  padding: 20px;
  min-width: 300px;
  min-height: ${({ $noContent, $loading }) => ($noContent || $loading ? '220px' : '')};
`
const ListSpinner = () => (
  <Overlay>
    <Spinner />
  </Overlay>
)
export const List = <T extends unknown>({ items, mapper, loading, noContent }: Props<T>) => {
  const id = useId()
  const showNoContent = items.length === 0 && !loading

  return (
    <ListBody $noContent={showNoContent} $loading={loading}>
      {showNoContent && noContent}
      {loading && <ListSpinner />}
      {items.map(mapper).map((mappedItem, index) => (
        <div key={`${id}-li-${index}`}>{mappedItem}</div>
      ))}
    </ListBody>
  )
}
