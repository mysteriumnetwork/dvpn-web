/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import themes from '../../../../commons/themes'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  gap: 16px;
  background: ${themes.current().colorWhite};
  padding: 20px;
  color: ${themes.current().colorDarkBlue};
}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-family: 'Ubuntu';
  font-size: ${themes.current().fontSizeSmall};
  font-weight: 400;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

const DiffValue = styled.div`
  display: block;
  width: 80px;
  font-size: ${themes.current().fontSizeNormal};
  padding: 0 10px;
  border-radius: 100px;

  color: ${({ positive }: { positive: boolean }) =>
    positive ? themes.current().colorGreen : themes.current().colorGrayBlue};
  background: ${({ positive }: { positive: boolean }) =>
    positive ? themes.current().backgroundLightgreen : themes.current().backgroundLightgray};
`

interface Props {
  icon: ReactNode
  value: ReactNode
  title: string
  diff?: number
  tooltip?: ReactNode
}

export const ReportCard = ({ icon, value, title, tooltip, diff = 0 }: Props) => {
  return (
    <Card>
      <div>{icon}</div>
      <Content>
        <div>{value}</div>
        <Title>{title}</Title>
      </Content>
      <Meta>
        <DiffValue positive={diff > 0}>
          {diff > 0 ? '+ ' : '- '}
          {Math.abs(diff)}
        </DiffValue>
      </Meta>
    </Card>
  )
}
