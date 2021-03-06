/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { CircularProgress, Fade, Mark, Modal } from '@material-ui/core'

import './SettingsModal.scss'

import Button from '../../../Components/Buttons/Button'
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js'
import { displayMyst } from '../../../commons/money.utils'
import MystSlider from '../../../Components/MystSlider/MystSlider'

interface Props {
  isOpen: boolean
  onClose: () => void
  identity: Identity
  fees?: Fees
  onIncreaseStake: () => Promise<any>
  onDecreaseStake: (amount: number) => Promise<any>
}

interface State {
  initialStake: number
  selectedStake: number
  loading: boolean
}

const marks = (stake: number): Mark[] => {
  return [
    {
      value: 0,
      label: '0',
    },
    {
      value: stake,
      label: `${stake}`,
    },
  ]
}

const StakeEditModal = ({ isOpen, onClose, identity, fees, onIncreaseStake, onDecreaseStake }: Props): JSX.Element => {
  const { earnings, stake: rawStake } = identity

  const stake = Number((rawStake / DECIMAL_PART).toFixed(2))

  const [state, setState] = useState<State>({
    initialStake: stake,
    selectedStake: stake,
    loading: false,
  })

  const increaseBy = (): number => {
    return earnings - (fees?.settlement || 0)
  }

  const decreaseBy = (): number => {
    return (state.initialStake - state.selectedStake) * DECIMAL_PART - (fees?.decreaseStake || 0)
  }

  const decreaseEnabled = (): boolean => {
    return state.initialStake > state.selectedStake
  }

  const calcMarks = marks(stake)

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
        <div className="settings-modal--block">
          <div className="title">Edit Stake</div>
          <div className="settings">
            <div className="settings--point m-b-20">
              <p className="m-b-5">
                Stake amount defines how often your node will auto-settle payments. Lowering the value will make
                settling more expensive because more transactions will be made, therefore more transaction fees will
                occur.
              </p>
              Stake increase is done by settling the unsettled amount into it. You can decrease the stake by lowering
              slider value below the maximum. When decreasing stake, the amount which you decrease it by will be settled
              to your wallet. Both actions have corresponding fees.
            </div>
            {fees === undefined ? (
              <CircularProgress className="spinner" disableShrink />
            ) : (
              <div className="settings--slider">
                {rawStake > 0 ? (
                  <MystSlider
                    marks={calcMarks}
                    value={state.selectedStake}
                    disabled={false}
                    handleChange={(e, v) => {
                      setState((cs) => ({ ...cs, selectedStake: v as number }))
                    }}
                    max={state.initialStake}
                    label="Stake"
                    min={0}
                    step={0.01}
                  />
                ) : (
                  <div>Either you have no stake or you have no payment channel generated.</div>
                )}
              </div>
            )}
          </div>
          <div className="additional-info">
            <div>
              <div className="additional-info__title">Increase Fee:</div>
              <div className="additional-info__text">{displayMyst(fees?.settlement)}</div>
            </div>
            <div>
              <div className="additional-info__title">Decrease Fee:</div>
              <div className="additional-info__text">{displayMyst(fees?.decreaseStake)}</div>
            </div>
          </div>
          <div className="line" />
          <div className="buttons-block">
            {decreaseEnabled() ? (
              <Button
                extraStyle="outline-primary"
                onClick={() => {
                  Promise.all([setState((cs) => ({ ...cs, loading: true }))])
                    .then(() => onDecreaseStake(decreaseBy()))
                    .then(() => onClose())
                    .catch(() => setState((cs) => ({ ...cs, loading: false })))
                    .finally(() => setState((cs) => ({ ...cs, loading: false })))
                }}
                disabled={decreaseBy() < 0}
              >
                Decrease ({displayMyst(decreaseBy())})
              </Button>
            ) : (
              <Button
                onClick={() => {
                  Promise.all([setState((cs) => ({ ...cs, loading: true }))])
                    .then(() => onIncreaseStake())
                    .then(() => onClose())
                    .catch(() => setState((cs) => ({ ...cs, loading: false })))
                    .finally(() => setState((cs) => ({ ...cs, loading: false })))
                }}
                disabled={increaseBy() < 0}
              >
                Increase ({displayMyst(increaseBy())})
              </Button>
            )}
            <Button onClick={onClose} extraStyle="outline">
              Close
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default StakeEditModal
