/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { useTheme } from 'styled-components'

const Legend = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.heatAtlas.legend.bgColor};
  box-shadow: ${({ theme }) => theme.heatAtlas.legend.boxShadow};
  border-radius: 20px;
  height: 56px;
  bottom: -23px;
  width: 98%;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;

  display: flex;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  color: ${({ theme }) => theme.text.colorMain};
`

const Content = styled.div`
  width: 100%;
  margin-left: 48px;
  margin-right: 48px;
`

export const HeatAtlasLegend = () => {
  const {
    heatAtlas: { heat },
  } = useTheme()
  return (
    <Legend>
      <Content>
        <Row>
          <Title>World distribution</Title>
          <LegendEntry color={heat.m200} text="More than 200" />
          <LegendEntry color={heat.m100} text="More than 100" />
          <LegendEntry color={heat.m50} text="More than 50" />
          <LegendEntry color={heat.m0} text="1 or more" />
        </Row>
      </Content>
    </Legend>
  )
}

const EntryColor = styled.div<{ $color: string }>`
  border-radius: 100%;
  background-color: ${({ $color }) => $color};
  width: 26px;
  height: 26px;
  min-width: 26px;
  min-height: 26px;
  font-weight: 400;
`

const EntryText = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
`

const EntryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const LegendEntry = ({ color, text }: { color: string; text: string }) => {
  return (
    <EntryContent>
      <EntryColor $color={color} />
      <EntryText>{text}</EntryText>
    </EntryContent>
  )
}
