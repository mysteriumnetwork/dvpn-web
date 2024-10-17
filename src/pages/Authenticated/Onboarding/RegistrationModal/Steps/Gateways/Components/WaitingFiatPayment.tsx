/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { CircularSpinner } from '../../../../../../../components/CircularSpinner/CircularSpinner'
import { devices } from '../../../../../../../theme/themes'
import { ReactComponent as Icon } from '../../../../../../../assets/images/check.svg'
interface WaitingPaymentProps {
  isCompleted: boolean
  handlePayNow: () => Promise<void>
  visible: boolean
}

const WaitingSpinner = styled(CircularSpinner)`
  height: 30px;
  min-width: 30px;
  max-width: 50px;
  max-height: 50px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  @media ${devices.tablet} {
    margin-top: 10px;
  }
`

const Waiting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  gap: 5px;
  @media ${devices.tablet} {
    height: 20px;
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
    margin-top: 10px;
    font-weight: 500;
  }
`
const Message = styled.span`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  margin: 10px 0;
  > em {
    margin-left: 0.25em;
    color: ${({ theme }) => theme.common.colorKey};
    font-weight: 500;
    text-decoration: underline;
    font-style: normal;
  }
`
const Success = styled(Waiting)`
  color: ${({ theme }) => theme.common.colorGreen};
`
const Check = styled(Icon)`
  #outer {
    fill: ${({ theme }) => theme.common.colorGreen};
  }
`
export const WaitingFiatPayment = ({ isCompleted, visible, handlePayNow }: WaitingPaymentProps) => {
  if (visible) {
    return <></>
  }

  return isCompleted ? (
    <Success>
      <Check />
      Payment successful!
    </Success>
  ) : (
    <Container>
      <Message>
        If you have encountered issues during the payment, please retry by following this
        <em onClick={handlePayNow}>link</em>.
      </Message>
      <Waiting>
        <WaitingSpinner />
        Please wait for confirmation (might take couple of minutes)
      </Waiting>
    </Container>
  )
}
