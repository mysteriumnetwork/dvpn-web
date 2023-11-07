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
  justify-content: space-between;
  @media ${devices.tablet} {
  }
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
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault()
          await handleChange()
        }}
      >
        <InputGroup
          error={error}
          input={
            <TextField
              value={store.address}
              onChange={(v) => store.setAddress(v)}
              placeholder="Enter your settlement wallet address..."
            />
          }
        />
        <FlexGrow />
        <Controls>
          <Button label="Change" variant="primary" type="submit" loading={store.loading} />
          <Button
            label="Cancel"
            variant="outlined"
            disabled={store.loading}
            onClick={() => {
              store.reset()
              onClose && onClose()
            }}
          />
        </Controls>
      </StyledForm>
    </Modal>
  )
})
