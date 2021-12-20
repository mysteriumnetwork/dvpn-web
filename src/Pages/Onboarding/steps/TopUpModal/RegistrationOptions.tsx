/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './TopUpModal.module.scss'
import { currentCurrency } from '../../../../commons/money.utils'
import { QRCode } from 'react-qr-svg'
import { CircularProgress, Tooltip } from '@material-ui/core'
import { HowToGetMyst } from './howto'
import { myst } from '../../../../commons/myst.utils'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import React from 'react'
import { Identity } from 'mysterium-vpn-js'

interface MYSTProps {
  identity: Identity
  registrationFee: number
  chainName: string
  isMYSTReceived: boolean
}

export const MYST = ({ identity, registrationFee, chainName, isMYSTReceived }: MYSTProps) => {
  return (
    <>
      <div>
        1. Send not less than {`${registrationFee} ${currentCurrency()}`} to your identity balance on {chainName}
      </div>
      <div className={styles.topupChannelAddress}>{identity.channelAddress}</div>
      <div className={styles.topupQR}>
        <QRCode value={identity.channelAddress} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Tooltip
          title={HowToGetMyst()}
          style={{ backgroundColor: '#FFFFFF !important', fill: '#9D9D9D' }}
          placement="bottom"
          arrow
          interactive
          children={<div>Don't have any MYST? Read here how to get it</div>}
        />
      </a>
      <div>2. Wait for the confirmation (might take a couple of minutes)</div>
      <div className={styles.topupReceived}>
        {myst.displayMYST(identity.balance)}{' '}
        {!isMYSTReceived ? (
          <>
            received...
            <CircularProgress disableShrink />
          </>
        ) : (
          <CheckCircleOutline fontSize="large" />
        )}
      </div>
    </>
  )
}

export const RegistrationOptions = {
  MYST,
}
