/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField } from '../../../../../Components/Inputs/TextField'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { Button } from '../../../../../Components/Inputs/Button'
import styled from 'styled-components'
import { devices } from '../../../../../theme/themes'
import { Modal } from '../../../../../Components/Modals/Modal'
import zIndexes from '../../../../../constants/z-indexes'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { SettleButtonIcon } from '../../../../../Components/Icons/ButtonIcons'
import { InfoIcon } from '../../../../../Components/Icons/Icons'
import toasts from '../../../../../commons/toasts'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  gap: 24px;
  height: 100%;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

const Controls = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  @media ${devices.tablet} {
  }
`

const ToolTipIcon = styled(InfoIcon)`
  height: 20px;
  width: 20px;

  @media ${devices.tablet} {
    height: 50px;
    width: 50px;
  }
`

const Notice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 8px;
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  width: 90%;

  color: ${({ theme }) => theme.text.colorMain};

  background-color: ${({ theme }) => theme.asyncBeneficiaryModal.notice.bgColor};
`

class AsyncBeneficiaryModalStore {
  address = ''
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAddress(address: string) {
    this.address = address
  }

  setLoading(b = true) {
    this.loading = b
  }

  reset() {
    this.address = ''
    this.loading = false
  }
}

const store = new AsyncBeneficiaryModalStore()

type Props = {
  onClose?: () => void
  onChange?: (address: string) => Promise<void>
  show?: boolean
  error?: string
}

export const AsyncBeneficiaryUpdateModal = observer(({ onClose, show, error, onChange }: Props) => {
  const handleChange = async () => {
    if (!onChange) {
      return
    }
    try {
      await onChange(store.address)
    } catch (e) {
      return
    }
    toasts.toastSuccess('Wallet address was successfully set')
    onClose && onClose()
    store.reset()
  }

  return (
    <Modal
      icon={<SettleButtonIcon />}
      title="Change settlement wallet"
      disableBackdrop
      onClickX={onClose}
      show={show}
      zIndex={zIndexes.asyncBeneficiaryModal}
    >
      <Notice>
        <ToolTipIcon /> Please make sure the address an ERC-20 Polygon compatible wallet e.g. MetaMask
      </Notice>
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault()
          await handleChange()
        }}
      >
        <InputGroup
          error={error}
          input={<TextField value={store.address} onChange={(v) => store.setAddress(v)} placeholder="Wallet address" />}
        />
        <FlexGrow />
        <Controls>
          <Button
            label="Cancel"
            variant="outlined"
            disabled={store.loading}
            onClick={() => {
              store.reset()
              onClose && onClose()
            }}
            rounded
          />
          <Button label="Save" variant="primary" type="submit" loading={store.loading} rounded />
        </Controls>
      </StyledForm>
    </Modal>
  )
})
