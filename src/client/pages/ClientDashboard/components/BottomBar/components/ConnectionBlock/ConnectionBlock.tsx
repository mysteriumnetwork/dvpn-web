import * as React from 'react'
import { MouseEventHandler } from 'react'
import trans from '../../../../../../../trans'
import Button from '../../../../../../../ui-kit/components/Button/Button'
import CountryItem from './components/CountryItem'
import ConnectionTypeItem from './components/ConnectionTypeItem'
import { Proposal } from 'mysterium-vpn-js'
import _ from 'lodash'

const styles = require('./ConnectionBlock.module.scss')

type Props = {
  proposal?: Proposal,
  onClick?: MouseEventHandler
  disabled?: boolean
}

const ConnectionBlock: React.FunctionComponent<Props> = (props: Props) => (
  <div className={styles.root}>
    <div className={styles.info}>
      <p className={styles.infoID}>{_.get(props, 'proposal.providerId')}</p>
      <div className={styles.infoRow}>
        <CountryItem location={_.get(props, 'proposal.serviceDefinition.locationOriginate')}/>
        <ConnectionTypeItem type={_.get(props, 'proposal.serviceType')}/>
      </div>
    </div>
    <div className={styles.action}>
      {props.proposal && (
        <Button color="primary" onClick={props.onClick} disabled={props.disabled}>{trans('app.client.dashboard.connect.button')}</Button>
      )}
      {/*<Link to={NAV_CLIENT_CONNECTING}>*/}
      {/*  <Button color="primary">{trans('app.client.dashboard.connect.button')}</Button>*/}
      {/*</Link>*/}
    </div>
  </div>
)

export default ConnectionBlock
