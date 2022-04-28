/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress, Tooltip } from '@material-ui/core'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import classNames from 'classnames'
import React from 'react'
import { QRCode } from 'react-qr-svg'
import { useSelector } from 'react-redux'
import { currentCurrency } from '../../../commons/money.utils'
import { myst } from '../../../commons/myst.utils'
import payments from '../../../commons/payments'
import { selectors } from '../../../redux/selectors'
import styles from './Direct.module.scss'
import { HowToGetMyst } from './howto'
import { GatewayProps } from './types'

const Direct = ({ payments: { amountRequiredWei } }: GatewayProps) => {
  const { channelAddress, balanceTokens } = useSelector(selectors.currentIdentitySelector)
  const isRegistrationFeeReceived = myst
    .toWeiBig(balanceTokens.wei)
    .gte(amountRequiredWei || payments.MINIMAL_REGISTRATION_FEE_ETHER)

  return (
    <div className={styles.content}>
      <p>
        1. Send no less than {myst.display(amountRequiredWei, { fractionDigits: 2 })} to the address below. Important:
        only Polygon blockchain {currentCurrency()} is supported!
      </p>
      <p className={styles.centered}>{channelAddress}</p>
      <div className={styles.qr}>
        <QRCode value={channelAddress} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.centered}>
        <Tooltip
          title={HowToGetMyst()}
          style={{ backgroundColor: '#FFFFFF !important', fill: '#9D9D9D' }}
          placement="bottom"
          arrow
          interactive
          children={<div>Don't have any MYST? Read here how to get it</div>}
        />
      </a>
      <p>2. Wait for the confirmation (might take a couple of minutes)</p>
      <div className={classNames(styles.centered, styles.centeredReceived)}>
        {myst.display(balanceTokens.wei)}{' '}
        {!isRegistrationFeeReceived ? (
          <>
            received...
            <CircularProgress disableShrink />
          </>
        ) : (
          <CheckCircleOutline fontSize="large" />
        )}
      </div>
    </div>
  )
}

export default Direct
