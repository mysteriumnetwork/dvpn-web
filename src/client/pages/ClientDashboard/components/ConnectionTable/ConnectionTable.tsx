import * as React from 'react'

import TableHead from './components/TableHead/TableHead'
import TableBody from './components/TableBody/TableBody'
import { Proposal } from '../../../../../api/data/proposal'

const styles = require('./ConnectionTable.module.scss')

type Props = {
  proposals: Proposal[]
  onSelect?: Function
  selected?: Proposal
}

const ConnectionTable = (props: Props) => (
  <div className={styles.root}>
    <TableHead/>
    <TableBody proposals={props.proposals} onSelect={props.onSelect} selected={props.selected}/>
  </div>
)

export default ConnectionTable
