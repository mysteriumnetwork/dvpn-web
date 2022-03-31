/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './TopUpModal.module.scss'
import { currentCurrency } from '../../../../commons/money.utils'
import { QRCode } from 'react-qr-svg'
import { Tooltip } from '@material-ui/core'
import { HowToGetMyst } from './howto'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'

interface Props {
  registrationFee: number
  chainName: string
  mystReceived?: JSX.Element
  controls?: JSX.Element
}

export const MYST = ({ registrationFee, chainName, controls, mystReceived }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  return (
    <>
      <div>
        1. Send not less than {`${registrationFee} ${currentCurrency()}`} to the address below. Important: only Polygon
        blockchain MYST is supported!
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
      {mystReceived}
      {controls}
    </>
  )
}
