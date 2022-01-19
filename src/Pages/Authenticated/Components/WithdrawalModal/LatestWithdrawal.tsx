/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { tequilaClient } from '../../../../api/tequila-client'
import { Settlement, SettlementType } from 'mysterium-vpn-js'
import styles from './WithdrawalModal.module.scss'

export const LatestWithdrawal = () => {
  const [withdrawal, setWithdrawal] = useState<Settlement | undefined>()
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const latestWithdrawal = await tequilaClient
      .settlementHistory({ types: [SettlementType.Withdrawal] })
      .then((resp) => resp.items.find((it) => it))
    setWithdrawal(latestWithdrawal)
  }

  if (!withdrawal) {
    return <></>
  }

  const { blockExplorerUrl, txHash } = withdrawal

  return (
    <div className={styles.tx}>
      Your last transaction:{' '}
      {blockExplorerUrl ? (
        <a href={blockExplorerUrl} rel="noreferrer" target="_blank">
          {txHash}
        </a>
      ) : (
        <span style={{ color: '#000' }}>{txHash}</span>
      )}
    </div>
  )
}
