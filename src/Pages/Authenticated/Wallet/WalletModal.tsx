/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { Fade, Modal } from '@material-ui/core'

import './WalletModel.scss'

import MystSlider from '../../../Components/MystSlider/MystSlider'
import Button from '../../../Components/Buttons/Button'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface StateProps {
  stake: number
}

const WalletModal = ({ onClose, isOpen }: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useState<StateProps>({
    stake: 30,
  })

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
        <div className="wallet-modal--block">
          <div className="title">Update stake goal</div>
          <div className="settings">
            <div className="settings--slider">
              <MystSlider
                label="Price per minute"
                value={state.stake}
                handleChange={(e, v) => {
                  setState({ ...state, stake: v })
                }}
                step={1}
                min={12}
                max={100}
                disabled={false}
              />
              <div className="bottom-line">
                <p>12 MYST</p>
                <p>100 MYST</p>
              </div>
            </div>
            <p className="bottom-text">
              Stake goal should be between min and max values. If current stake will be less than stake goal, 10% of
              each settlement amount will be used to increase stake.
            </p>
          </div>
          <div className="buttons-block">
            <Button onClick={onClose}>Close</Button>
            <Button isLoading={isLoading}>Save</Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default WalletModal
