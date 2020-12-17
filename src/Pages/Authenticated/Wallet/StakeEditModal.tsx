/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { CircularProgress, Fade, Mark, Modal } from '@material-ui/core'

import './WalletModel.scss'

import Button from '../../../Components/Buttons/Button'
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js'
import { displayMyst } from '../../../commons/money.utils'
import Slider from '../../../Components/Slider/Slider'

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
      className="wallet-modal"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="wallet-modal--block">
          <div className="title">Edit Stake</div>
          <div className="settings">
            <div className="settings--point m-b-20">
              Stake increase is done by settling the unsettled amount into it. You can decrease the stake by lowering
              slider value below maximum. When decreasing stake, the amount which you decrease it by will be settled to
              you wallet. Both actions have corresponding fees.
            </div>
            {fees === undefined ? (
              <CircularProgress className="spinner" />
            ) : (
              <div className="settings--slider">
                {rawStake > 0 ? (
                  <Slider
                    marks={calcMarks}
                    value={state.selectedStake}
                    disabled={false}
                    handleChange={(e, v) => {
                      setState({ ...state, selectedStake: v as number })
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
                  Promise.all([setState({ ...state, loading: true })])
                    .then(() => onDecreaseStake(state.selectedStake * DECIMAL_PART))
                    .then(() => onClose())
                    .catch(() => setState({ ...state, loading: false }))
                    .finally(() => setState({ ...state, loading: false }))
                }}
                disabled={decreaseBy() < 0}
              >
                Decrease ({displayMyst(decreaseBy())})
              </Button>
            ) : (
              <Button
                onClick={() => {
                  Promise.all([setState({ ...state, loading: true })])
                    .then(() => onIncreaseStake())
                    .then(() => onClose())
                    .catch(() => setState({ ...state, loading: false }))
                    .finally(() => setState({ ...state, loading: false }))
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
