/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { twMerge } from 'tailwind-merge'
import { observer } from 'mobx-react-lite'
import Card from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'
import Link from '../../../components/Links/Link'
import ErrorMessage from '../../../components/Typography/ErrorMessage'
import ModalV2 from '../../../components/Modals/ModalV2'
import toasts from '../../../commons/toasts'
import { useAppDispatch, useAppSelector } from '../../../commons/hooks'
import { myst } from '../../../commons/mysts'
import ROUTES from '../../../constants/routes'
import { feez } from '../../../commons/fees'
import identities from '../../../commons/identities'
import errors from '../../../commons/errors'
import { updateBeneficiaryTxStatusStore } from '../../../redux/app.slice'
import complexActions from '../../../redux/complex.actions'
import { selectors } from '../../../redux/selectors'
import { useStores } from '../../../mobx/store'
import { tequila } from '../../../api/tequila'

const { api } = tequila
const { toastSuccess } = toasts

type Props = {
  readonly show: boolean
  readonly onClose?: () => void
  readonly onSave?: () => void
}

type State = {
  errors: string[]
}

export const SettleModal = observer(({ show, onClose = () => {}, onSave = () => {} }: Props) => {
  const { beneficiaryStore } = useStores()
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
    beneficiaryStore.fetchBeneficiaryAsyncAddress(identity.id)
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
    if (beneficiaryStore.address === '') {
      errors.push('Beneficiary wallet has not been set')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [beneficiaryStore.address, calculatedFees.profitsWei])

  const handleSettle = async () => {
    setLoading(true)

    try {
      await api.settleAsync({ providerId: identity.id, hermesIds: identities.hermesIds(identity) })
      toastSuccess(`Automatic withdrawal to ${beneficiaryStore.address} request submitted`)
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
    <ModalV2 isOpen={show} title="Settle" onClose={onClose} size="lg">
      <LabeledInput label="External wallet address" value={beneficiaryStore.address} className="mb-4" fluid disabled />
      <div className="text-sm font-normal text-blue-850 mb-5">
        To set or change wallet address please follow this{' '}
        <Link href={ROUTES.SETTINGS} className="font-bold">
          link
        </Link>
      </div>
      <Card fluid className="mb-5 gap-6 py-8 border border-gray-75">
        <DataRow label="Amount" value={calculatedFees.earningsWei} />
        <DataRow label={`Network fee ${calculatedFees.hermesCutPercent * 100}%`} value={calculatedFees.hermesCutWei} />
        <DataRow label="Polygon mainnet fee" value={calculatedFees.blockchainFeeWei} />
        <DataRow label="You will get" value={calculatedFees.profitsWei} className="text-pink-525" />
      </Card>
      <div className="flex items-center mb-12">
        <div
          className={twMerge(
            'flex items-center justify-center size-7 min-w-7 min-h-7 border border-solid',
            'border-white-175 rounded-full bg-white-75 text-blue-850 mr-3',
          )}
        >
          i
        </div>
        <div className="text-sm font-normal text-blue-850">
          Settlement transaction may take a few minutes to complete.
        </div>
      </div>

      <div className="relative flex gap-4">
        {showErrors && (
          <div className="absolute bottom-full pb-2">
            {state.errors.map((message, idx) => (
              <ErrorMessage key={idx} value={message} />
            ))}
            {txStatus?.error && <ErrorMessage value="Failed to change wallet address. Please try again." />}
          </div>
        )}
        <Button
          label="Settle"
          loading={loading}
          disabled={isNegativeProfit || state.errors.length !== 0}
          onClick={async () => {
            await handleSettle()
          }}
          className="min-w-[200px] max-w-[200px]"
        />
        <Button label="Cancel" variant="secondary-outlined" onClick={onClose} />
      </div>
    </ModalV2>
  )
})

const DataRow = ({ label, value, className }: { label: string; value: BigNumber; className?: string }) => (
  <div className={twMerge('grid grid-cols-2 text-blue-850', className)}>
    <div className=" text-base font-bold">{label}</div>
    <div className="flex items-baseline gap-1 sm:gap-5">
      <div className="text-base font-bold">{myst.display(value, { fractions: 6, currency: false })}</div>
      <div className="text-gray-550 text-xs font-normal">MYST</div>
    </div>
  </div>
)
