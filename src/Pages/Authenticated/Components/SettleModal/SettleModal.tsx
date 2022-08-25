/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Modal } from '../../../../Components/Modals/Modal'
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../Components/Inputs/TextField'
import { selectors } from '../../../../redux/selectors'
import { useEffect, useMemo, useState } from 'react'
import { feez } from '../../../../commons/fees'
import styled from 'styled-components'
import { Button } from '../../../../Components/Inputs/Button'
import { SettleButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { ReactComponent as EditIcon } from '../../../../assets/images/edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../commons/hooks'
import { Card } from './Card'
import { myst } from '../../../../commons/mysts'
import toasts from '../../../../commons/toasts'
import { tequila } from '../../../../api/tequila'
import identities from '../../../../commons/identities'
import errors from '../../../../commons/errors'
import { isValidEthereumAddress } from '../../../../commons/ethereum.utils'
import { updateBeneficiaryTxStatusStore } from '../../../../redux/app.slice'
import { devices } from '../../../../theme/themes'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
const { isMobileQuery } = media

const Error = styled.div`
  color: red;
  font-size: 12px;
`

const Errors = styled.div`
  height: 40px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 80%;
  @media ${devices.tablet} {
    gap: 10px;
  }
`
const Note = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
  margin-top: 20px;
  @media ${devices.tablet} {
    margin: 10px 30px 0 35px;
    text-align: center;
  }
`
const HeaderNote = styled(Note)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`
const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`
const Container = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }
`
const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`

const { api } = tequila
const { toastSuccess } = toasts

interface Props {
  show: boolean
  onClose?: () => void
  onSave?: () => void
}

interface State {
  errors: string[]
}

export const SettleModal = ({ show, onClose = () => {}, onSave = () => {} }: Props) => {
  const dispatch = useAppDispatch()
  const txStatus = useAppSelector(selectors.beneficiaryTxStatus)

  const [externalWalletAddress, setExternalWalletAddress] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<State>({
    errors: [],
  })

  const handleClose = () => {
    onClose()
    setInputDisabled(true)
  }

  const { beneficiary } = useAppSelector(selectors.beneficiary)
  const { current, hermesPercent } = useAppSelector(selectors.fees)
  const identity = useAppSelector(selectors.currentIdentity)

  const calculatedFees = useMemo(() => feez.calculateEarnings(identity.earningsTokens, current, hermesPercent), [
    hermesPercent,
    current.settlement.wei,
    identity.earningsTokens,
  ])

  const isExternalWalletChanged = beneficiary !== externalWalletAddress

  useEffect(() => {
    ;(async () => {
      if (identities.isEmpty(identity)) {
        return
      }

      setExternalWalletAddress(beneficiary)

      try {
        const status = await api.beneficiaryTxStatus(identity.id).catch(() => undefined)
        dispatch(updateBeneficiaryTxStatusStore(status))
      } catch (e: any) {
        errors.parseToastError(e)
      }
      setLoading(false)
    })()
  }, [identity.id, beneficiary, show])

  const isProfitsBelowZero = calculatedFees.profitsWei.lt(0)

  useEffect(() => {
    const errors: string[] = []
    if (isProfitsBelowZero) {
      errors.push(
        `You don’t have enough earnings to cover settlement costs. At least ${myst.display(
          calculatedFees.totalFeesWei,
        )} is required`,
      )
    }
    if (!isValidEthereumAddress(externalWalletAddress)) {
      errors.push('Invalid external wallet address')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [externalWalletAddress, calculatedFees.profitsWei])

  const handleExternalWalletChange = (v: string) => setExternalWalletAddress(v)
  const handleDisableChange = (v: boolean) => setInputDisabled(v)

  const handleSettle = async () => {
    setLoading(true)

    try {
      if (isExternalWalletChanged) {
        api.settleWithBeneficiary({
          providerId: identity.id,
          hermesId: '',
          beneficiary: externalWalletAddress,
        })
      } else {
        api.settleAsync({ providerId: identity.id, hermesIds: identities.hermesIds(identity) })
      }

      toastSuccess(`Automatic withdrawal to ${externalWalletAddress} request submitted`)
      await tequila.refreshBeneficiary(identity.id)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    onSave()
    handleClose()
    setLoading(false)
  }
  const isNegativeProfit = calculatedFees.profitsWei.lte(0)
  const isMobile = useMediaQuery(isMobileQuery)
  const showErrors = state.errors.length > 0
  return (
    <Modal
      show={show}
      title="Settle"
      size={isMobile ? 'xl' : undefined}
      icon={<SettleButtonIcon />}
      onClickX={handleClose}
    >
      <Content>
        <HeaderNote>External wallet address: </HeaderNote>
        <Container>
          <InputGroup
            fluid
            input={
              <TextField
                disabled={inputDisabled}
                value={externalWalletAddress}
                onChange={handleExternalWalletChange}
                icon={
                  <StyledEditIcon
                    onClick={() => {
                      handleDisableChange(!inputDisabled)
                    }}
                  />
                }
              />
            }
          />
        </Container>
        <Row>
          <Card title="Amount" amount={myst.display(calculatedFees.earningsWei, { fractionDigits: 6 })} />
          <Card
            title={`Network fee ${calculatedFees.hermesCutPercent * 100}%`}
            amount={myst.display(calculatedFees.hermesCutWei, { fractionDigits: 6 })}
          />
          <Card
            title="Polygon mainnet fee"
            amount={myst.display(calculatedFees.blockchainFeeWei, { fractionDigits: 6 })}
          />
          <Card $primary title="You will get" amount={myst.display(calculatedFees.profitsWei, { fractionDigits: 6 })} />
        </Row>
        <Note>
          Please click SETTLE to proceed with settlement to External wallet. Note: Settlement transaction may take a few
          minutes to complete.
        </Note>
        {showErrors && (
          <Errors>
            {state.errors.map((message, idx) => (
              <Error key={idx}>{message}</Error>
            ))}
            {txStatus?.error && <Error>Fail to change wallet address. Please try again.</Error>}
          </Errors>
        )}
        <Footer>
          <Button
            label="Cancel"
            rounded
            variant={'outlined'}
            onClick={() => {
              handleClose()
            }}
          />
          <Button
            label={isExternalWalletChanged ? 'Settle and change wallet address' : 'Settle'}
            rounded
            loading={loading}
            disabled={isNegativeProfit || state.errors.length !== 0}
            onClick={async () => {
              await handleSettle()
            }}
          />
        </Footer>
      </Content>
    </Modal>
  )
}
