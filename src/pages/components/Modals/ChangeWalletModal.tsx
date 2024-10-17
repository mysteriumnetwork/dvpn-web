/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import ModalV2 from '../../../components/Modals/ModalV2'
import Card from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'
import toasts from '../../../commons/toasts'

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
  onChange: (address: string) => Promise<void>
  show: boolean
  error?: string
}

export const ChangeWalletModal = observer(({ onClose = () => {}, show, error, onChange }: Props) => {
  const handleChange = async () => {
    try {
      await onChange(store.address)
    } catch (e) {
      return
    }
    toasts.toastSuccess('Wallet address was successfully set')
    onClose()
    store.reset()
  }

  return (
    <ModalV2 title="Change settlement wallet" size="lg" onClose={onClose} isOpen={show}>
      <Card className="flex flex-row border border-gray-75 py-2.5 mb-6 items-center">
        <div
          className={twMerge(
            'flex items-center justify-center size-7 min-w-7 min-h-7 border border-solid',
            'border-white-175 rounded-full bg-white-75 text-blue-850 mr-3',
          )}
        >
          i
        </div>
        <div className="text-sm font-normal text-blue-850">
          Please make sure the address an ERC-20 Polygon compatible wallet e.g. MetaMask
        </div>
      </Card>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleChange()
        }}
      >
        <LabeledInput
          label="Wallet address"
          value={store.address}
          fluid
          onChange={(v) => store.setAddress(v)}
          isError={!!error}
          errorMessage={error}
        />
        <div className="flex gap-4 mt-2">
          <Button
            label="Save"
            variant="primary"
            type="submit"
            loading={store.loading}
            className="min-w-[200px] max-w-[200px]"
          />
          <Button
            label="Cancel"
            variant="secondary-outlined"
            disabled={store.loading}
            onClick={() => {
              store.reset()
              onClose && onClose()
            }}
          />
        </div>
      </form>
    </ModalV2>
  )
})
