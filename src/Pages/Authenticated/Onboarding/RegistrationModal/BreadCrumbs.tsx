/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 16px;
`

interface ActiveProps {
  $active?: boolean
}

const StepWrapper = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: ${({ theme }) => theme.common.fontSizeBig};
  color: ${({ theme, $active }) => ($active ? theme.common.colorKey : theme.common.colorGrayBlue)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`

const Step = styled.div<ActiveProps>`
  background-color: ${({ theme, $active }) => ($active ? theme.common.colorKey : theme.common.colorGrayBlue)};
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 600;
  line-height: 35px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Dot = styled.div`
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.common.colorKeyLight}; ;
`

interface Props {
  current: number
}

const STEPS = ['Select payment method', 'Payment', 'Set withdrawal address']

export const BreadCrumbs = ({ current }: Props) => {
  return (
    <Container>
      {STEPS.map((step, index) => (
        <StepWrapper key={`step-${index}`} $active={index === current}>
          <Step $active={index === current}>{index + 1}</Step>
          {step}
          {index !== STEPS.length - 1 && (
            <Dots>
              <Dot />
              <Dot />
              <Dot />
            </Dots>
          )}
        </StepWrapper>
      ))}
    </Container>
  )
}
