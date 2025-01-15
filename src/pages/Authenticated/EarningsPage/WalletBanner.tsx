/**
 * Copyright (c) 2025 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import Card, { CardProps } from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { ChangeWalletModal } from '../../components/Modals/ChangeWalletModal'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { useStores } from '../../../mobx/store'

const WalletBanner = observer(({ className, ...props }: CardProps) => {
  const { beneficiaryStore } = useStores()
  const { id } = useAppSelector(selectors.currentIdentity)
  useEffect(() => {
    beneficiaryStore.fetchBeneficiaryAsyncAddress(id)
  }, [id])
  if (beneficiaryStore.address) {
    return null
  }
  return (
    <Card
      className={twMerge('text-white bg-[linear-gradient(90deg,#A0A3EB_32.8%,#8ED7F8_100%)]', className)}
      {...props}
    >
      <div className="w-full flex gap-x-3">
        <div className="bg-white size-[32px] rounded-full flex items-center justify-center shrink-0 grow-0">
          <span className="text-blue-850 text-sm font-bold">i</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            Please <span className="font-bold">add your wallet</span> address, in order to settle your future earnings.
          </div>
          <Button
            size="sm"
            label="Add Wallet"
            variant="secondary-outlined"
            className="border-white text-white bg-transparent px-8"
            onClick={() => beneficiaryStore.setShowChangeModal()}
          />
        </div>
      </div>
      <ChangeWalletModal
        error={beneficiaryStore.error}
        onChange={(address) => beneficiaryStore.updateBeneficiaryAsyncAddress({ identity: id, address })}
        onClose={() => beneficiaryStore.setShowChangeModal(false)}
        show={beneficiaryStore.showChangeModal}
      />
    </Card>
  )
})

export default WalletBanner
