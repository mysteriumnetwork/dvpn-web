import * as React from 'react'
import ConnectionItem from './components/ConnectionItem/ConnectionItem'
import { Proposal } from '../../../../../../../api/data/proposal'

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
          <ConnectionItem key={value.providerId}
                          proposal={value}
                          onSelect={props.onSelect}
                          active={props.selected && props.selected.providerId === value.providerId}/>
        ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TableBody
