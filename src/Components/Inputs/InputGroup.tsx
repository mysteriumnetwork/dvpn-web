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

const Header = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themes.common.fontSizeNormal};
  font-weight: 500;
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${themes.common.fontSizeSmall};
  font-weight: 400;
`

const Error = styled.div`
  display: flex;
  color: ${themes.common.colorKey};
  font-size: ${themes.common.fontSizeSmallest};
  margin-top: 4px;
`

interface Props {
  title: string
  subTitle?: ReactNode
  input: ReactNode
  fluid?: boolean
  error?: string
}

export const InputGroup = ({ input, title, subTitle, fluid, error }: Props) => {
  return (
    <Container $fluid={fluid}>
      <Header>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Header>
      {input}
      {error && <Error>{error}</Error>}
    </Container>
  )
}
