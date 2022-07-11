/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import themes from '../../commons/themes'

interface ContainerProps {
  $fluid?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $fluid }) => $fluid && '100%'};
`

const Title = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  color: ${themes.current().colorDarkBlue};
  font-size: ${themes.current().fontSizeNormal};
  font-weight: 500;
  margin-bottom: 6px;
`

const Error = styled.div`
  display: flex;
  color: ${themes.current().colorKey};
  font-size: ${themes.current().fontSizeSmallest};
  margin-top: 4px;
`

interface Props {
  title: string
  titleRight?: ReactNode
  input: ReactNode
  fluid?: boolean
  error?: string
}

export const InputGroup = ({ input, title, titleRight, fluid, error }: Props) => {
  return (
    <Container $fluid={fluid}>
      <Title>
        {title}
        {titleRight && titleRight}
      </Title>
      {input}
      {error && <Error>{error}</Error>}
    </Container>
  )
}
