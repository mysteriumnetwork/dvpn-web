/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress, Fade, Modal } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Fees, Identity } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { displayMyst, toMyst } from '../../../../commons/money.utils'
import { toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import ConfirmationDialogue from '../../../../Components/ConfirmationDialogue/ConfirmationDialogue'
import { Select, SelectItem } from '../../../../Components/Select/Select'
import { TextField } from '../../../../Components/TextField/TextField'
import './WithdrawalModal.scss'
import { SSEState } from '../../../../redux/sse.slice'
import { RootState } from '../../../../redux/store'

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
  chainOptions: SelectItem[]
  toChain: number
  isLoading: boolean
  withdrawalInProgress: boolean
  withdrawalCompleted: boolean
  fees: Fees
  error?: string
}

const initialState: State = {
  showConfirm: false,
  withdrawalAddress: '',
  chainOptions: [],
  withdrawalAmountMYST: 0,
  withdrawalAmountWei: 0,
  toChain: 0,
  isLoading: true,
  withdrawalInProgress: false,
  withdrawalCompleted: false,
  fees: {
    registration: 0,
    settlement: 0,
    hermes: 0,
    decreaseStake: 0,
  },
}

const MINIMAL_WITHDRAWAL_AMOUNT = 10_000_000_000_000_000 // 0.01 MYST

const WithdrawalModal = ({ isOpen, onClose, identity }: Props) => {
  const [state, setState] = useImmer<State>(initialState)
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)
  const hermesId = sse?.appState?.channels[0].hermesId

  const showConfirm = (b: boolean) =>
    setState((d) => {
      d.showConfirm = b
    })

  useEffect(() => {
    const init = async () => {
      setState(initialState)
      const { address } = await tequilapiClient.payoutAddressGet(identity.id)
      const chainSummary = await tequilapiClient.chainSummary()
      const { chains, currentChain } = chainSummary
      const chainOptions = Object.keys(chains)
        .map(Number)
        .filter((k) => k !== currentChain)
        .map((k) => {
          const chainName = chains[k]
          return {
            value: k,
            name: chainName,
          }
        })
      const firstChain = chainOptions?.find((i) => i)?.value

      const fees = await tequilapiClient.transactorFees(firstChain)
      setState((d) => {
        d.withdrawalAddress = address
        d.chainOptions = chainOptions
        d.withdrawalAmountMYST = Number(toMyst(identity.balance))
        d.withdrawalAmountWei = identity.balance
        d.toChain = firstChain || 0
        d.fees = fees
        d.isLoading = false
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

  const isInsaneWithdrawal = state.withdrawalAmountWei - settlement < MINIMAL_WITHDRAWAL_AMOUNT
  const isWithdrawDisabled =
    state.withdrawalInProgress || state.isLoading || isInsaneWithdrawal || state.withdrawalCompleted
  const clearErrors = () =>
    setState((d) => {
      d.error = undefined
    })
  const validateForm = (): string | undefined => {
    const { withdrawalAddress } = state
    if (!withdrawalAddress || withdrawalAddress === '') {
      return 'Withdrawal address is required'
    }

    if (isInsaneWithdrawal) {
      return 'Withdrawal amount is below minimal 0.01 MYST'
    }
  }
  return (
    <Modal
      className="settings-modal"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="withdrawal-modal__block">
          <div className="withdrawal-modal__title">Withdrawal</div>
          <div className="withdrawal-modal__rows">
            <div className="withdrawal-modal__row-disclaimer">
              You can withdraw your collected earnings into own Ethereum or Polygon wallet address at any time.
            </div>
            {!hermesId && <div className="withdrawal-modal__row-hermes_warning">Could not resolve hermesId</div>}
            {state.isLoading || !hermesId ? (
              <div className="withdrawal-modal__row-withdraw-loading">
                <CircularProgress className="spinner-relative" disableShrink />
              </div>
            ) : (
              <>
                <div className="withdrawal-modal__row-withdraw-error">
                  <Collapse in={!!state.error}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {state.error}
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
                    <div className="input-group__label">Amount (MYST)</div>
                    <TextField
                      disabled
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
                      items={state.chainOptions}
                      value={state.toChain}
                      onChange={(value) => {
                        setState((d) => {
                          d.toChain = value as number
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
              disabled={isWithdrawDisabled}
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
              Withdrawal
            </Button>
          </div>
          <ConfirmationDialogue
            message="Are you sure?"
            open={state.showConfirm}
            onCancel={() => {
              showConfirm(false)
            }}
            onConfirm={async () => {
              try {
                await tequilapiClient.withdraw({
                  hermesId: hermesId!,
                  providerId: identity.id,
                  beneficiary: state.withdrawalAddress,
                  toChainId: state.toChain,
                })
                setState((d) => {
                  d.withdrawalCompleted = true
                })
                toastSuccess('Withdrawal completed successfully!')
                onClose()
              } catch (e) {
                setState((d) => {
                  d.error = e?.message || 'API Error'
                })
              }
              showConfirm(false)
            }}
          />
        </div>
      </Fade>
    </Modal>
  )
}
export default WithdrawalModal
