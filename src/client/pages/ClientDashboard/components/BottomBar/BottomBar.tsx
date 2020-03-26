import * as React from 'react'
import InfoBlock from './components/InfoBlock/InfoBlock'
import ConnectionBlock from './components/ConnectionBlock/ConnectionBlock'
import { ConsumerLocation, Proposal, IdentityRef } from 'mysterium-vpn-js'

const styles = require('./BottomBar.module.scss')

type Props = {
  location?: ConsumerLocation
  proposal?: Proposal
  identity: IdentityRef
  onConnect?: Function
  disabled?: boolean
}

export default class BottomBar extends React.PureComponent<Props> {

  handleConnectClick = () => {
    const { onConnect, proposal, identity } = this.props

    return onConnect && onConnect(proposal, identity)
  }

  render() {
    const { location, proposal, disabled } = this.props

    return (
      <div className={styles.root}>
        <InfoBlock location={location}/>
        <ConnectionBlock proposal={proposal} onClick={this.handleConnectClick} disabled={disabled}/>
      </div>
    )
  }
}
