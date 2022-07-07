/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import themes from '../../../commons/themes'
import { CircularSpinner } from '../../../Components/CircularSpinner/CircularSpinner'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: ${themes.current().colorWhite};
  padding: 25px;
  border-radius: 20px;

  box-shadow: 0px 10px 30px rgba(78, 28, 103, 0.05);

  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
`

const LoadingOverlay = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${themes.current().colorWhite}AA;
`

const Spinner = styled(CircularSpinner)`
  width: 4em;
  height: 4em;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;

  color: ${themes.current().colorDarkBlue};
  font-size: ${themes.current().fontSizeBig};
  font-weight: 700;
  margin-bottom: 24px;
`

const Footer = styled.div`
  display: flex;
`

interface Props {
  title: string
  children?: ReactNode
  footer?: ReactNode
  loading?: boolean
}

export const SettingsCard = ({ title, children, footer, loading }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>
        {loading && (
          <LoadingOverlay>
            <Spinner />
          </LoadingOverlay>
        )}
        {children}
        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Container>
  )
}
