/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../../theme/themeCommon'
import { devices } from '../../../theme/themes'

interface Props {
  nodeVersion: string
  nodeUIVersion: string
}

const Container = styled.div`
  display: flex;
  gap: 50px;
  @media ${devices.tablet} {
    flex-direction: column;
    gap: 5px;
  }
`
const Title = styled.div`
  font-size: ${themeCommon.fontSizeSmall};
  color: ${themeCommon.colorGrayBlue};
  font-weight: 400;
`
const Value = styled.div`
  font-size: ${themeCommon.fontSizeSmall};
  color: ${themeCommon.colorGrayBlue2};
  font-weight: 700;
`
const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const Issue = ({ nodeUIVersion, nodeVersion }: Props) => {
  return (
    <Container>
      <Row>
        <Title>Node version:</Title>
        <Value>{nodeVersion}</Value>
      </Row>
      <Row>
        <Title>Node UI version:</Title>
        <Value>{nodeUIVersion}</Value>
      </Row>
    </Container>
  )
}
