/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { RegistrationStepProps } from '../types'
import { Button } from '../../../../../Components/Inputs/Button'
import { isValidEthereumAddress } from '../../../../../commons/ethereum.utils'
import { toast } from 'react-toastify'
import errors from '../../../../../commons/errors'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import identities from '../../../../../commons/identities'
import { tequila } from '../../../../../api/tequila'
import { PAYOUT_GUIDE } from '../../../../../constants/urls'
import { devices } from '../../../../../theme/themes'

const { api } = tequila
const Link = styled.a`
  color: ${({ theme }) => theme.common.colorBlue};
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 600;
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
  }
`
const Description = styled.div`
  display: flex;
  margin: 30px 0;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  line-height: 22px;
  @media ${devices.tablet} {
    margin: 10px 0;
  }
`

const Input = styled.div`
  margin: 45px 0;
  @media ${devices.tablet} {
    margin: 10px 0;
  }
`

const FlexGrow = styled.div`
  flex-grow: 1;
  @media ${devices.tablet} {
    margin-bottom: 10px;
  }
`

const NetworkRegistration = ({ next, beneficiary, setBeneficiary, loading, setLoading }: RegistrationStepProps) => {
  const identity = useAppSelector(selectors.currentIdentity)

  const isInvalidWithdrawalAddress = () => {
    return !isValidEthereumAddress(beneficiary)
  }

  const handleFinish = async () => {
    try {
      if (isInvalidWithdrawalAddress()) {
        toast.error('Invalid wallet address')
        return
      }

      setLoading(true)
      if (identities.isUnregistered(identity) || identities.isRegistrationError(identity)) {
        await api.identityRegister(identity.id, {
          beneficiary,
          stake: 0,
        })
      }
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  return (
    <Content>
      <Title>Wallet Address</Title>
      <Description>
        Your earnings will be automatically transferred to your account. 🎉 Please add your ERC-20 Polygon compatible
        wallet for automatic withdrawals.
      </Description>
      <Input>
        <InputGroup
          title="Withdrawal Address (required)"
          input={<TextField placeholder="0x..." onChange={setBeneficiary} value={beneficiary} />}
        />
      </Input>
      <Description>
        Make sure withdrawal address is from ERC-20 Polygon compatible wallet (e.g MetaMask or MyEtherWallet)
      </Description>
      <Link href={PAYOUT_GUIDE} target="_blank" rel="noreferrer">
        Check here for instructions how to setup MYST token on MetaMask
      </Link>
      <FlexGrow />
      <Button rounded label="Finish" onClick={handleFinish} />
    </Content>
  )
}

export default NetworkRegistration
