/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Modal } from '../../../Components/Modals/Modal'
import styled from 'styled-components'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { CircularSpinner } from '../../../Components/CircularSpinner/CircularSpinner'
import identities from '../../../commons/identities'
import CopyToClipboard from '../../../Components/CopyToClipboard/CopyToClipboard'
import zIndexes from '../../../constants/z-indexes'
import { devices } from '../../../theme/themes'
const Content = styled.div`
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 16px;
`
const Text = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
  @media ${devices.tablet} {
    text-align: center;
    font-size: ${({ theme }) => theme.common.fontSizeBig};
  }
`
const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeNormal};
    gap: 5px;
  }
`
const Spinner = styled(CircularSpinner)`
  width: 100px;
  height: 100px;
`

const Error = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.common.colorKey};
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
`

interface Props {
  show: boolean
}

export const RegistrationInProgressModal = ({ show }: Props) => {
  const identity = useAppSelector(selectors.currentIdentity)
  const isError = identities.isRegistrationError(identity)

  return (
    <Modal zIndex={zIndexes.onboardingModal} size="xl" disableBackdrop disableX show={show}>
      <Content>
        <Spinner />
        <Text>Your identity is being registered, please be patient...</Text>
        <Identity>
          {identity.id}
          <CopyToClipboard text={identity.id} />
        </Identity>
        {isError && <Error>Registration Error</Error>}
      </Content>
    </Modal>
  )
}
