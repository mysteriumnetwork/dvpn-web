import * as React from 'react'
import { ConsumerLocation, Proposal } from 'mysterium-vpn-js'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'
import _ from 'lodash'

const styles = require('./ConnectedImgBlock.module.scss')

type Props = {
  proposal: Proposal
  location: ConsumerLocation
}

const ConnectedImgBlock = (props: Props) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('ConnectedImgBlock', props)
  }
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

export default ConnectedImgBlock
