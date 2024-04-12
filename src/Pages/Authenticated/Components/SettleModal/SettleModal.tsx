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
import { useAppDispatch, useAppSelector } from '../../../../commons/hooks'
import { Card } from './Card'
import { myst } from '../../../../commons/mysts'
import toasts from '../../../../commons/toasts'
import { tequila } from '../../../../api/tequila'
import identities from '../../../../commons/identities'
import errors from '../../../../commons/errors'
import { updateBeneficiaryTxStatusStore } from '../../../../redux/app.slice'
import { devices } from '../../../../theme/themes'
import complexActions from '../../../../redux/complex.actions'
import zIndexes from '../../../../constants/z-indexes'
import { useStores } from '../../../../mobx/store'
import { observer } from 'mobx-react-lite'
import { InternalLink } from '../../../../Components/Common/Link'
import ROUTES from '../../../../constants/routes'

const Error = styled.div`
  color: red;
  font-size: 12px;
`

const Errors = styled.div`
  height: 40px;
  width: 90%;
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

const Notice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 4px;

  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
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

export const SettleModal = observer(({ show, onClose = () => {}, onSave = () => {} }: Props) => {
  const { asyncBeneficiaryStore } = useStores()
  const dispatch = useAppDispatch()
  const txStatus = useAppSelector(selectors.beneficiaryTxStatus)

  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<State>({
    errors: [],
  })

  const { beneficiary } = useAppSelector(selectors.beneficiary)
  const { current, hermesPercent } = useAppSelector(selectors.fees)
  const identity = useAppSelector(selectors.currentIdentity)

  const calculatedFees = useMemo(
    () => feez.calculateEarnings(identity.earningsTokens, current, hermesPercent),
    [hermesPercent, current.settlement.wei, identity.earningsTokens],
  )

  useEffect(() => {
    asyncBeneficiaryStore.fetchBeneficiaryAsyncAddress(identity.id)
  }, [identity.id])

  useEffect(() => {
    ;(async () => {
      if (identities.isEmpty(identity)) {
        return
      }

      try {
        const status = await api.beneficiaryTxStatus(identity.id).catch(() => undefined)
        dispatch(updateBeneficiaryTxStatusStore(status))
      } catch (err: any) {
        errors.parseToastError(err)
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
    if (asyncBeneficiaryStore.address === '') {
      errors.push('Beneficiary wallet has not been set')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [asyncBeneficiaryStore.address, calculatedFees.profitsWei])

  const handleSettle = async () => {
    setLoading(true)

    try {
      await api.settleAsync({ providerId: identity.id, hermesIds: identities.hermesIds(identity) })
      toastSuccess(`Automatic withdrawal to ${asyncBeneficiaryStore.address} request submitted`)
      await complexActions.refreshBeneficiary(identity.id)
    } catch (err: any) {
      errors.parseToastError(err)
    }

    onSave()
    onClose()
    setLoading(false)
  }
  const isNegativeProfit = calculatedFees.profitsWei.lte(0)

  const showErrors = state.errors.length > 0
  return (
    <Modal show={show} title="Settle" icon={<SettleButtonIcon />} onClickX={onClose} zIndex={zIndexes.settleModal}>
      <Content>
        <HeaderNote>External wallet address: </HeaderNote>
        <Container>
          <InputGroup
            fluid
            input={
              <TextField
                disabled
                value={asyncBeneficiaryStore.address}
                placeholder="Beneficiary wallet has not been set"
              />
            }
          />
        </Container>
        <Notice>
          To set or change wallet address please follow this <InternalLink to={ROUTES.SETTINGS}>link</InternalLink>
        </Notice>
        <Row>
          <Card title="Amount" amount={myst.display(calculatedFees.earningsWei, { fractions: 6 })} />
          <Card
            title={`Network fee ${calculatedFees.hermesCutPercent * 100}%`}
            amount={myst.display(calculatedFees.hermesCutWei, { fractions: 6 })}
          />
          <Card title="Polygon mainnet fee" amount={myst.display(calculatedFees.blockchainFeeWei, { fractions: 6 })} />
          <Card $primary title="You will get" amount={myst.display(calculatedFees.profitsWei, { fractions: 6 })} />
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
            {txStatus?.error && <Error>Failed to change wallet address. Please try again.</Error>}
          </Errors>
        )}
        <Footer>
          <Button label="Cancel" rounded variant={'outlined'} onClick={onClose} />
          <Button
            label="Settle"
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
})
