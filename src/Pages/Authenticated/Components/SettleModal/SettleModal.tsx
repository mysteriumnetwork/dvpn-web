/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: TEST THE API hookup
import { Modal } from '../../../../Components/Modals/Modal'
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../Components/Inputs/TextField'
import { selectors } from '../../../../redux/selectors'
import { useState, useMemo, useEffect } from 'react'
import { feez } from '../../../../commons/fees'
import styled from 'styled-components'
import { Button } from '../../../../Components/Inputs/Button'
import { SettleButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { ReactComponent as EditIcon } from '../../../../assets/images/edit.svg'
import { useAppSelector } from '../../../../commons/hooks'
import { Card } from './Card'
import { myst } from '../../../../commons/mysts'
import Error from '../../../../Components/Validation/Error'
import toasts from '../../../../commons/toasts'
import { tequila } from '../../../../api/tequila'
import { BeneficiaryTxStatus } from 'mysterium-vpn-js'
import identities from '../../../../commons/identities'
import errors from '../../../../commons/errors'
import { isValidEthereumAddress } from '../../../../commons/ethereum.utils'

interface Props {
  show: boolean
  onClose?: () => void
}

// TODO Figure out why styling override doesnt work for this component
const ErrorNote = styled(Error)`
  color: red;
  font-size: 12px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 80%;
`
const Note = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
  margin-top: 20px;
`
const HeaderNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
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
const RowCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
`
const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`

const { api } = tequila
const { toastSuccess } = toasts
interface State {
  externalWalletAddress: string
  loading: boolean
  disabled?: boolean
  txStatus?: BeneficiaryTxStatus
  errors: string[]
}

export const SettleModal = ({ show, onClose }: Props) => {
  const [state, setState] = useState<State>({
    externalWalletAddress: '',
    loading: true,
    disabled: true,
    errors: [],
  })

  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose()
  }
  const { isChannelAddress, beneficiary } = useAppSelector(selectors.beneficiarySelector)
  const { current, hermesPercent } = useAppSelector(selectors.feesSelector)
  const identity = useAppSelector(selectors.currentIdentitySelector)

  const calculatedFees = useMemo(() => feez.calculateEarnings(identity.earningsTokens, current, hermesPercent), [
    hermesPercent,
    current.settlement.wei,
    identity.earningsTokens,
  ])
  useEffect(() => {
    ;(async () => {
      if (identities.isEmpty(identity)) {
        return
      }
      try {
        const txStatus = await api.beneficiaryTxStatus(identity.id).catch(() => undefined)
        setState((p) => ({
          ...p,
          externalWalletAddress: isChannelAddress ? '' : beneficiary,
          txStatus,
          loading: false,
        }))
      } catch (e: any) {
        errors.parseToastError(e)
      }
    })()
  }, [identity.id, beneficiary])

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
    if (!isValidEthereumAddress(state.externalWalletAddress)) {
      errors.push('Invalid external wallet address')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [state.externalWalletAddress, calculatedFees.profitsWei])

  const handleExternalWalletChange = (v: string) => setState((p) => ({ ...p, externalWalletAddress: v }))
  const handleDisableChange = (v: boolean) => setState((p) => ({ ...p, disabled: v }))
  const setLoading = (b: boolean = true) => setState((p) => ({ ...p, loading: b }))

  const handleSettle = async () => {
    setLoading()
    try {
      await api.settleWithBeneficiary({
        providerId: identity.id,
        hermesId: '',
        beneficiary: state.externalWalletAddress,
      })
      toastSuccess(`Automatic withdrawal to ${state.externalWalletAddress} request submitted`)
      await tequila.refreshBeneficiary(identity.id)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }
  const isNegativeProfit = calculatedFees.profitsWei.lte(0)

  return (
    <Modal show={show} title="Settle" icon={<SettleButtonIcon />} onClickX={handleClose}>
      <Content>
        <HeaderNote>External wallet address: </HeaderNote>
        <Container>
          <InputGroup
            fluid
            input={
              <TextField
                disabled={state.disabled}
                value={state.externalWalletAddress}
                onChange={handleExternalWalletChange}
                icon={
                  <StyledEditIcon
                    onClick={() => {
                      handleDisableChange(!state.disabled)
                    }}
                  />
                }
              />
            }
          />
        </Container>
        <RowCenter>
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
        </RowCenter>
        <Note>
          Please click SETTLE to proceed with settlement to External wallet. Note: Settlement transaction may take a few
          minutes to complete.
        </Note>
        <div>
          {state.errors.map((message, idx) => (
            <ErrorNote key={idx} show errorMessage={message} />
          ))}
        </div>
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
            label="Settle"
            rounded
            loading={state.loading}
            disabled={isNegativeProfit}
            onClick={async () => {
              await handleSettle()
            }}
          />
        </Footer>
      </Content>
    </Modal>
  )
}
