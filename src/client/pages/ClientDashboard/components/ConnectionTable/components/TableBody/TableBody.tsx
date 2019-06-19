import * as React from 'react'
import ConnectionItem from './components/ConnectionItem/ConnectionItem'
import { Proposal } from '../../../../../../../api/data/proposal'
import compareProposals from '../../../../../../../utils/compareProposals'

const styles = require('./TableBody.module.scss')

type Props = {
  proposals?: Proposal[]
  onSelect?: Function
  selected?: Proposal
}

const TableBody = (props: Props) => (
  <div className={styles.root}>
    <div className={styles.scrollView}>
      <table>
        <tbody>
        {Array.from(props.proposals || []).map(value => (
          <ConnectionItem key={`${value.providerId}-${value.serviceType}`}
                          proposal={value}
                          onSelect={props.onSelect}
                          active={compareProposals(props.selected, value)}/>
        ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TableBody
