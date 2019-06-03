import * as React from 'react'
import trans from '../../../../../trans'
import { Proposal } from 'mysterium-vpn-js'

const styles = require('./ConnectionInfoBlock.module.scss')

type Props = {
  proposal: Proposal
}

const ConnectionInfoBlock = (props: Props) => {
  const id = String(props.proposal && props.proposal.providerId).substr(-8)

  return (
    <div className={styles.root}>
      <div className={styles.infoRow}>
        <p>{trans('app.client.external.ip')}</p>
        <p>...</p>
      </div>
      <div className={styles.infoRow}>
        <p>{trans('app.client.server.id')}</p>
        <p className={styles.infoID}>{id}</p>
      </div>
    </div>
  )
}

export default ConnectionInfoBlock
