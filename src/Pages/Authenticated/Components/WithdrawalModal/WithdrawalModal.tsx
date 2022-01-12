/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'
import { DECIMAL_PART, Fees, Identity, Settlement } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../../api/tequila-client'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { currentCurrency, displayMyst, toMyst } from '../../../../commons/money.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import ConfirmationDialogue from '../../../../Components/ConfirmationDialogue/ConfirmationDialogue'
import { TextField } from '../../../../Components/TextField/TextField'
import './WithdrawalModal.scss'
import { Option, Select } from '../../../../Components/Select/Select'
import { Modal } from '../../../../Components/Modal/Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  identity: Identity
}

const Card = ({ info, value, important }: { info: string; value: string | number; important?: boolean }) => {
  const extraClass = important && 'modal-card__important'
  return (
    <div className={['modal-card', extraClass].join(' ')}>
      <div className="modal-card__info">{info}</div>
      <div className="modal-card__value">{value}</div>
    </div>
  )
}

interface State {
  showConfirm: boolean
  withdrawalAddress: string
  withdrawalAmountMYST: number
  withdrawalAmountWei: number
  balanceTotalWei: number
  chainOptions: Option[]
  toChain: Option
  isLoading: boolean
  withdrawalInProgress: boolean
  withdrawalCompleted: boolean
  fees: Fees
  error?: string
  isInsaneWithdrawal: boolean
  isWithdrawDisabled: boolean
  overBalance: boolean
  latestWithdrawal?: Settlement
  hermesId: string
}

const initialState: State = {
  showConfirm: false,
  withdrawalAddress: '',
  chainOptions: [],
  withdrawalAmountMYST: 0,
  withdrawalAmountWei: 0,
  balanceTotalWei: 0,
  toChain: { label: '0', value: '0' },
  isLoading: true,
  withdrawalInProgress: false,
  withdrawalCompleted: false,
  fees: {
    registration: 0,
    settlement: 0,
    hermes: 0,
    decreaseStake: 0,
  },
  isInsaneWithdrawal: false,
  isWithdrawDisabled: false,
  overBalance: false,
  hermesId: '',
}

const MINIMAL_WITHDRAWAL_AMOUNT = 10_000_000_000_000_000 // 0.01 MYST
const POLYGON_MATIC_MAINNET_CHAIN_ID = 137

const WithdrawalModal = ({ isOpen, onClose, identity }: Props) => {
  const [state, setState] = useImmer<State>(initialState)

  const showConfirm = (b: boolean) =>
    setState((d) => {
      d.showConfirm = b
    })

  useEffect(() => {
    const init = async () => {
      setState(initialState)
      const { address } = await tequilaClient.payoutAddressGet(identity.id).catch(() => ({ address: '' }))
      const chainSummary = await tequilaClient.chainSummary()
      const latestWithdrawal = await tequilaClient
        .settlementHistory()
        .then((resp) => resp.items.find((s) => s.isWithdrawal))

      const { chains, currentChain } = chainSummary
      const chainOptions = Object.keys(chains)
        .map(Number)
        .map((k) => {
          const chainName = chains[k]
          return {
            value: k,
            label: chainName,
          }
        })
      const initialChain = chainOptions?.find((i) => i.value === POLYGON_MATIC_MAINNET_CHAIN_ID)!
      const fees = await tequilaClient.transactorFees(initialChain.value)
      setState((d) => {
        d.withdrawalAddress = address
        d.chainOptions = chainOptions
        d.withdrawalAmountMYST = Number(toMyst(identity.balance))
        d.withdrawalAmountWei = identity.balance
        d.balanceTotalWei = identity.balance
        d.toChain = initialChain || currentChain
        d.fees = fees
        d.isLoading = false
        d.isInsaneWithdrawal = identity.balance - fees.settlement < MINIMAL_WITHDRAWAL_AMOUNT
        d.overBalance = d.withdrawalAmountWei > identity.balance
        d.isWithdrawDisabled =
          d.withdrawalInProgress || d.isLoading || d.isInsaneWithdrawal || d.withdrawalCompleted || d.overBalance
        d.latestWithdrawal = latestWithdrawal
        d.hermesId = identity.hermesId
      })
    }
    if (isOpen) {
      init()
    } else {
      setState((d) => {
        d.isLoading = true
      })
    }
  }, [isOpen])

  const {
    fees: { settlement },
  } = state

  const clearErrors = () =>
    setState((d) => {
      d.error = undefined
    })

  useEffect(() => {
    const myst = state.withdrawalAmountMYST
    const wei = myst * DECIMAL_PART
    setState((d) => {
      d.withdrawalAmountWei = wei
      d.isInsaneWithdrawal = d.withdrawalAmountWei - settlement < MINIMAL_WITHDRAWAL_AMOUNT
      d.overBalance = d.withdrawalAmountWei > identity.balance
      d.isWithdrawDisabled =
        d.withdrawalInProgress || d.isLoading || d.isInsaneWithdrawal || d.withdrawalCompleted || d.overBalance
    })
  }, [state.withdrawalAmountMYST, state.toChain])

  const validateForm = (): string | undefined => {
    const { withdrawalAddress } = state
    if (!withdrawalAddress || withdrawalAddress === '') {
      return 'Withdrawal address is required'
    }

    if (state.isInsaneWithdrawal) {
      return 'Withdrawal amount after fees is below minimal 0.01 MYST'
    }

    if (state.overBalance) {
      return 'Your withdraw amount exceeds your balance'
    }
  }

  const errors = validateForm()

  const { latestWithdrawal } = state
  const withdrawalContainsTXLink = (): boolean => {
    return latestWithdrawal !== undefined && latestWithdrawal.blockExplorerUrl !== ''
  }

  return (
    <Modal open={isOpen} title="Withdrawal">
      <div className="withdrawal-modal__rows">
        <div className="withdrawal-modal__row-disclaimer">
          You can withdraw your collected earnings into own Ethereum or Polygon wallet address at any time. Please allow
          some time (usually a few minutes) for withdrawal transaction to be processed. Your balance will update once
          transaction is executed.
        </div>
        {state.isLoading ? (
          <div className="withdrawal-modal__row-withdraw-loading">
            <CircularProgress className="spinner-relative" disableShrink />
          </div>
        ) : (
          <>
            <div className="withdrawal-modal__row-withdraw-error">
              <Collapse in={!!errors}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {errors}
                </Alert>
              </Collapse>
              <Collapse in={state.toChain.value === POLYGON_MATIC_MAINNET_CHAIN_ID}>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  Make sure withdrawal address is from ERC-20 compatible wallet (e.g. MetaMask or MyEtherWallet)
                  supporting Polygon! Addresses from Ethereum network exchanges (e.g. Bittrex, HitBTC) are not supported
                  for Polygon network withdrawals and your tokens might be lost.
                </Alert>
              </Collapse>
            </div>
            <div className="withdrawal-modal__row-withdraw-info">
              <div className="input-group">
                <div className="input-group__label">Withdrawal Address</div>
                <TextField
                  value={state.withdrawalAddress}
                  onChange={(value) => {
                    setState((d) => {
                      d.withdrawalAddress = value
                    })
                  }}
                />
              </div>
              <div className="input-group">
                <div className="input-group__label">
                  Amount ({currentCurrency()}) / Your Balance: {toMyst(state.balanceTotalWei)}
                </div>
                <TextField
                  type="number"
                  value={state.withdrawalAmountMYST}
                  onChange={(value) => {
                    const n = Number(value)
                    setState((d) => {
                      d.withdrawalAmountMYST = n
                    })
                  }}
                />
              </div>
              <div className="input-group">
                <div className="input-group__label">Select chain</div>
                <Select
                  value={state.toChain}
                  options={state.chainOptions}
                  onChange={async (o) => {
                    const option = o as Option
                    const chainId = option.value as number
                    const fees = await tequilaClient.transactorFees(chainId)

                    setState((d) => {
                      d.toChain = option
                      d.fees = fees
                      d.isInsaneWithdrawal = identity.balance - fees.settlement < MINIMAL_WITHDRAWAL_AMOUNT
                    })
                  }}
                />
              </div>
            </div>
            <div className="withdrawal-modal__row-withdraw-fees">
              <Card
                info="Amount"
                value={displayMyst(state.withdrawalAmountWei, {
                  ...DEFAULT_MONEY_DISPLAY_OPTIONS,
                  showCurrency: false,
                })}
              />
              <Card
                info="Fee"
                value={displayMyst(settlement, {
                  ...DEFAULT_MONEY_DISPLAY_OPTIONS,
                  showCurrency: false,
                })}
              />
              <Card
                info="You will get"
                value={displayMyst(state.withdrawalAmountWei - settlement, {
                  ...DEFAULT_MONEY_DISPLAY_OPTIONS,
                  showCurrency: false,
                })}
                important
              />
            </div>
          </>
        )}
      </div>
      <>
        {latestWithdrawal && (
          <div className="withdrawal-modal__settlement-info">
            Your last transaction:{' '}
            {withdrawalContainsTXLink() ? (
              <a href={latestWithdrawal.blockExplorerUrl} rel="noreferrer" target="_blank">
                {latestWithdrawal.txHash}
              </a>
            ) : (
              <span style={{ color: '#000' }}>{latestWithdrawal.txHash}</span>
            )}
          </div>
        )}
      </>
      <div className="withdrawal-modal__footer">
        <Button
          onClick={() => {
            onClose()
            clearErrors()
          }}
          extraStyle="gray"
        >
          Close
        </Button>
        <Button
          isLoading={state.isLoading}
          disabled={state.isWithdrawDisabled}
          onClick={() => {
            const error = validateForm()
            if (error) {
              setState((d) => {
                d.error = error
              })
              return
            }
            clearErrors()
            showConfirm(true)
          }}
        >
          Withdraw
        </Button>
      </div>
      <ConfirmationDialogue
        message="Please click OK to proceed with your withdrawal request."
        open={state.showConfirm}
        onCancel={() => {
          showConfirm(false)
        }}
        onConfirm={async () => {
          try {
            await tequilaClient.withdraw({
              hermesId: state.hermesId,
              providerId: identity.id,
              beneficiary: state.withdrawalAddress,
              toChainId: state.toChain.value as number,
              amount: String(state.withdrawalAmountWei),
            })
            setState((d) => {
              d.withdrawalCompleted = true
            })
            toastSuccess('Withdrawal completed successfully!')
            onClose()
          } catch (e: any) {
            toastError('There was an error processing your withdrawal. Please try again later.')
          }
          showConfirm(false)
        }}
      />
    </Modal>
  )
}
export default WithdrawalModal
