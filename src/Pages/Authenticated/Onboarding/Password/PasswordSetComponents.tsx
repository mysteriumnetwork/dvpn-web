/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Welcome } from './Welcome'
import { Button } from '../../../../Components/Inputs/Button'
import { devices } from '../../../../theme/themes'

const Page = styled.div`
  padding: 66px;

  @media ${devices.tablet} {
    height: unset;
    padding: 15px;
  }

  @media ${devices.mobileS} {
    min-width: unset;
    max-height: unset;
    padding: unset;
  }
`

const WhiteCard = styled.div`
  background: ${({ theme }) => theme.onboarding.bgCard};
  border-radius: 30px;
  box-shadow: 0 20px 60px 0 #0000651a;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  min-height: calc(100vh - 66px - 66px);

  padding: 20px;

  @media ${devices.tablet} {
    padding: 15px;
  }

  @media ${devices.mobileS} {
    min-width: unset;
    max-height: unset;
    padding: unset;
    min-height: unset;
  }
`

const GradientCard = styled.div`
  position: relative;
  background: linear-gradient(180deg, #dfdff1 0%, #f7f8fe 100%);
  box-shadow: 0 20px 60px 0 #0000651a;
  max-width: 70%;
  border-radius: 40px;
  padding: 62px 62px 62px 62px;

  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    max-width: unset;
    padding: 30px 10px 50px 10px;
  }

  @media ${devices.mobileS} {
    min-width: unset;
    max-height: unset;
    border-radius: unset;
  }
`

type TextAlign = {
  $textAlign?: 'center' | 'left' | 'right' | string
}

const GTitle = styled.div<TextAlign>`
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
  text-align: ${({ $textAlign }) => $textAlign ?? 'left'};
  width: 100%;
`

const GSubTitle = styled.div<TextAlign>`
  font-size: ${({ theme }) => theme.common.fontSizeBiggest};
  font-weight: 600;
  color: ${({ theme }) => theme.text.colorMain};
  width: 100%;

  display: flex;
  gap: 12px;
  align-items: center;

  text-align: ${({ $textAlign }) => $textAlign ?? 'left'};

  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeBiggest};
  }
`

const GDescription = styled.div<TextAlign>`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  line-height: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.colorSecondary};
  width: 100%;

  text-align: ${({ $textAlign }) => $textAlign ?? 'left'};

  @media ${devices.tablet} {
  }
`

const StartButton = styled(Button)`
  width: 300px;

  @media ${devices.mobileS} {
    width: unset;
  }
`

export const PasswordSetComponents = {
  Page,
  WhiteCard,
  GradientCard,
  Welcome,
  GTitle,
  GDescription,
  StartButton,
  GSubTitle,
}
