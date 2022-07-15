/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Button } from '../Inputs/Button'
import { themeCommon } from '../../theme/themeCommon'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
`
const PageButton = styled.button`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  color: ${themeCommon.colorGrayBlue};
  background: none;
  border: 1px solid ${themeCommon.colorGrayBlue};

  :active {
    background: ${themeCommon.colorGrayBlue}51;
  }
`
const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`
export const Pagination = () => {
  return (
    <Container>
      <Button variant="outlined" label="Prev" rounded />
      <Pages>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
      </Pages>
      <Button variant="outlined" label="Next" rounded />
    </Container>
  )
}
