/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { QRCode } from 'react-qr-svg'
import Button from '../../../Components/Buttons/Button'
import { displayMyst } from '../../../commons/money.utils'
import { Identity } from 'mysterium-vpn-js'
import { CircularProgress, Fade, Modal } from '@material-ui/core'
import './TopupModal.scss'
import CopyToClipboard from '../../../Components/CopyToClipboard/CopyToClipboard'

interface Props {
  onTopup: () => void
  onClose: () => void
  topupSum: number
  identity: Identity
  open: boolean
}

const TopupModal = ({ identity, topupSum, onTopup, open, onClose }: Props) => {
  useEffect(() => {
    if (identity.balance >= topupSum) {
      onTopup()
      return
    }
  }, [identity.balance, open])

  return (
    <Modal
      open={open}
      className="topup-modal"
      disableBackdropClick
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="topup-modal__block">
          <div className="topup-modal__description">
            To activate your account, transfer <span className="topup-modal__highlighted">{displayMyst(topupSum)}</span>{' '}
            to your wallet
            <br />
            (Görli Testnet blockchain)
          </div>
          <div className="topup-modal__address">
            <div className="topup-modal__address_hash m-r-10">{identity.channelAddress}</div>
            <CopyToClipboard text={identity.channelAddress} />
          </div>
          <div className="topup-modal__qr">
            <QRCode value={identity.channelAddress} />
          </div>
          <div className="topup-modal__balance">
            <p className="topup-modal__balance__label">Your current balance</p>
            <p className="topup-modal__balance__value">{displayMyst(identity.balance)}</p>
          </div>
          <div className="topup-modal__description m-t-15">
            Do not send any other cryptocurrency to this address! Only MYST tokens are accepted.
          </div>
          <div className="topup-modal__footer-block m-t-20">
            <div className="topup-modal__blockchain">
              <p>Waiting for transfer</p>
              <small>Automatically scanning blockchain...</small>
            </div>
            <CircularProgress className="m-l-20" disableShrink />
          </div>
          <div className="topup-modal__footer-block m-t-15">
            <Button onClick={onClose}>Back</Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default TopupModal
