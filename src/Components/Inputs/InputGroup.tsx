/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'

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
  font-size: ${themeCommon.fontSizeNormal};
  font-weight: 500;
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${themeCommon.fontSizeSmaller};
  font-weight: 400;
`

const Error = styled.div`
  display: flex;
  color: ${themeCommon.colorKey};
  font-size: ${themeCommon.fontSizeSmall};
  margin-top: 4px;
`

interface Props {
  dataTestId?: string
  title?: string
  subTitle?: ReactNode
  input: ReactNode
  fluid?: boolean
  error?: string
}

export const InputGroup = ({ dataTestId, input, title, subTitle, fluid, error }: Props) => {
  return (
    <Container data-test-id={dataTestId} $fluid={fluid}>
      <Header>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Header>
      {input}
      {error && <Error>{error}</Error>}
    </Container>
  )
}
