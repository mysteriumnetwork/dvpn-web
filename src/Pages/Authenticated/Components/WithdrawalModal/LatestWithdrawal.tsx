/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Settlement, SettlementType } from 'mysterium-vpn-js'
import { tequila } from '../../../../api/tequila'
import styles from './WithdrawalModal.module.scss'
import { media } from '../../../../commons/media'
import { strings } from '../../../../commons/strings'
import { useMediaQuery } from 'react-responsive'

const { api } = tequila

export const LatestWithdrawal = () => {
  const isMobile = useMediaQuery(media.isMobileQuery)
  const [withdrawal, setWithdrawal] = useState<Settlement | undefined>()
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const latestWithdrawal = await api
      .settlementHistory({ types: [SettlementType.Withdrawal], pageSize: 1 })
      .then((resp) => resp.items.find((it) => it))
    setWithdrawal(latestWithdrawal)
  }

  if (!withdrawal) {
    return <></>
  }

  const { blockExplorerUrl, txHash } = withdrawal

  const enhancedTxHash = isMobile ? strings.truncateHash(txHash) : txHash

  return (
    <div className={styles.tx}>
      Your last transaction:{' '}
      {blockExplorerUrl ? (
        <a data-testid="LatestWithdrawal.txLink" href={blockExplorerUrl} rel="noreferrer" target="_blank">
          {enhancedTxHash}
        </a>
      ) : (
        <span data-testid="LatestWithdrawal.txPlain" style={{ color: '#000' }}>
          {enhancedTxHash}
        </span>
      )}
    </div>
  )
}
