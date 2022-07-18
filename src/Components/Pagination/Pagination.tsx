/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Button } from '../Inputs/Button'
import { themeCommon } from '../../theme/themeCommon'
import { useState } from 'react'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
`
const PageButton = styled.button<Props>`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  color: ${({ theme }) => theme.common.colorGrayBlue};
  background: none;
  border: 1px solid ${({ theme }) => theme.common.colorGrayBlue};
  :hover {
    cursor: pointer;
  }
  :active {
    background: ${themeCommon.colorGrayBlue}51;
  }
  :disabled {
    background: ${themeCommon.colorGrayBlue}51;
  }
`
const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
interface Props {
  onClick?: () => void
}
// TODO: Hook up to API, rinse logic for displaying active page

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages]: Array<any> = useState([1, 2, 3, 4, 5])

  return (
    <Container>
      <Button variant="outlined" label="Prev" rounded />
      <Pages>
        {pages.map((_: any, i: number) => (
          <PageButton
            disabled={i + 1 === currentPage}
            key={i}
            onClick={() => {
              setCurrentPage(i + 1)
              console.log(currentPage)
            }}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pages>
      <Button variant="outlined" label="Next" rounded />
    </Container>
  )
}
