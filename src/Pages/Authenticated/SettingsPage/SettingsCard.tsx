/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { CircularSpinner } from '../../../Components/CircularSpinner/CircularSpinner'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import zIndexes from '../../../constants/z-indexes'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.bgSettingsCard};
  padding: 25px;
  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(78, 28, 103, 0.05);
  gap: 24px;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const LoadingOverlay = styled.div`
  position: absolute;
  z-index: ${zIndexes.overlay};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  background-color: ${themeCommon.colorDarkBlue + alphaToHex(0.3)};
`

const Spinner = styled(CircularSpinner)`
  width: 4em;
  height: 4em;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const TitleText = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  display: flex;
`

interface Props {
  title?: ReactNode
  titleControl?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  loading?: boolean
}

export const SettingsCard = ({ title, children, footer, loading }: Props) => {
  return (
    <Container>
      {title && (
        <Title>
          <TitleText>{title}</TitleText>
        </Title>
      )}
      {children && <Content>{children}</Content>}
      <FlexGrow />
      {footer && <Footer>{footer}</Footer>}
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
    </Container>
  )
}
