import * as React from 'react'
import { Location as OriginalLocation, Proposal } from 'mysterium-vpn-js'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'
import _ from 'lodash'

const styles = require('./ConnectionImgBlock.module.scss')

type Props = {
  proposal?: Proposal,
  location?: OriginalLocation
}

const ConnectionImgBlock = (props: Props) => {
  const fromCountry = _.get(props, 'location.country')
  const toCountry = _.get(props, 'proposal.serviceDefinition.locationOriginate.country')

  return (
    <div className={styles.root}>
      <div className={styles.back}/>
      <div className={styles.user}>
        {fromCountry && (<FlagIcon code={String(fromCountry).toLowerCase()}/>)}
      </div>
      <div className={styles.node}>
        {toCountry && (<FlagIcon code={String(toCountry).toLowerCase()}/>)}
      </div>
    </div>
  )
}

export default ConnectionImgBlock
