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
import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Button } from '../../../../Components/Inputs/Button'
import { SettleButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { ReactComponent as EditIcon } from '../../../../assets/images/edit.svg'
import { useAppSelector } from '../../../../commons/hooks'
import { alphaToHex } from '../../../../theme/themeCommon'
import { myst } from '../../../../commons/mysts'
interface Props {
  show: boolean
  onClose?: () => void
}

interface CardProps {
  $primary?: boolean
}
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 80%;
`
const Card = styled.div<CardProps>`
  background-color: ${({ $primary, theme }) =>
    $primary ? theme.common.colorKeyLight + alphaToHex(0.05) : theme.common.colorGrayBlue + alphaToHex(0.05)};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: flex-start;
  padding: 15px;
`
const CardTitle = styled.div<CardProps>`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ $primary, theme }) => ($primary ? theme.common.colorKeyLight : theme.common.colorGrayBlue2)};
  margin-bottom: 5px;
`
const Ammount = styled.span<CardProps>`
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  color: ${({ $primary, theme }) => ($primary ? theme.common.colorKey : theme.common.colorDarkBlue)};
`
const Myst = styled.span<CardProps>`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ $primary, theme }) => ($primary ? theme.common.colorKeyLight : theme.common.colorGrayBlue2)};
  text-transform: uppercase;
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

const RowStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
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
export const SettleModal = ({ show, onClose }: Props) => {
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose()
  }
  const { beneficiary } = useAppSelector(selectors.beneficiarySelector)
  const { current, hermesPercent } = useAppSelector(selectors.feesSelector)
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)

  const earnings = useMemo(() => Number(myst.display(earningsTokens.wei, { fractionDigits: 6, showCurrency: false })), [
    earningsTokens.wei,
  ])
  const networkFee = useMemo(() => {
    const fee = Number(earningsTokens.wei) * Number(hermesPercent)
    return Number(myst.display(fee, { fractionDigits: 6, showCurrency: false }))
  }, [earningsTokens.wei])
  const polygonFee = useMemo(
    () => Number(myst.display(current.settlement.wei, { fractionDigits: 6, showCurrency: false })),
    [current.settlement.wei],
  )
  const total = useMemo(() => {
    const sum =
      Number(earningsTokens.wei) - Number(earningsTokens.wei) * Number(hermesPercent) - Number(current.settlement.wei)
    return Number(myst.display(sum, { fractionDigits: 6, showCurrency: false }))
  }, [earningsTokens.wei, current.settlement.wei])
  // TODO: Move out card as seperate reusable???
  return (
    <Modal show={show} title="Settle" icon={<SettleButtonIcon />} onClickX={handleClose}>
      <Content>
        <HeaderNote>External wallet address: </HeaderNote>
        <Container>
          <InputGroup
            fluid
            input={
              <TextField
                disabled={disabled}
                placeholder={beneficiary}
                value={address}
                onChange={(v) => setAddress(v)}
                icon={
                  <StyledEditIcon
                    onClick={() => {
                      setDisabled(!disabled)
                    }}
                  />
                }
              />
            }
          />
        </Container>
        <RowCenter>
          {/* TODO: Rethink layout?????? */}
          <Card>
            <CardTitle>Amount</CardTitle>
            <RowStart>
              <Ammount>{earnings}</Ammount>
              <Myst>myst</Myst>
            </RowStart>
          </Card>
          <Card>
            <CardTitle>{`Network fee (${Number(hermesPercent) * 100}%)`}</CardTitle>
            <RowStart>
              <Ammount>{networkFee}</Ammount>
              <Myst>myst</Myst>
            </RowStart>
          </Card>
          <Card>
            <CardTitle>Polygon Mainnet fee</CardTitle>
            <RowStart>
              <Ammount>{polygonFee}</Ammount>
              <Myst>myst</Myst>
            </RowStart>
          </Card>
          <Card $primary>
            <CardTitle $primary>You will get</CardTitle>
            <RowStart>
              <Ammount $primary>{total}</Ammount>
              <Myst $primary>myst</Myst>
            </RowStart>
          </Card>
        </RowCenter>
        <Note>
          Please click SETTLE to proceed with settlement to External wallet. Note: Settlement transaction may take a few
          minutes to complete.
        </Note>
        <Footer>
          <Button
            label="Cancel"
            rounded
            variant={'outlined'}
            onClick={() => {
              handleClose()
            }}
          />
          {/* TODO: Add API call to invoke beneficiary change */}
          <Button label="Settle" rounded type={'submit'} />
        </Footer>
      </Content>
    </Modal>
  )
}
