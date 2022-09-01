/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgSettingsCard};
  gap: 15px;
  margin-left: 50px;
`
const Title = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 600;
  color: ${({ theme }) => theme.text.colorMain};
`
interface Props {
  title?: string
  children?: React.ReactNode | React.ReactNode[]
}

export const PanelCard = ({ title, children }: Props) => {
  return (
    <Card>
      <Title>{title}</Title>
      {children}
    </Card>
  )
}
