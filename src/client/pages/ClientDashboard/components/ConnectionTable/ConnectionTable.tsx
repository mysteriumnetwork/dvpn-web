import * as React from 'react'

import TableHead from './components/TableHead/TableHead'
import TableBody from './components/TableBody/TableBody'
import { Proposal } from '../../../../../api/data/proposal'
import { qualityCalculator } from '../../../../../utils/quality-calculator'

const styles = require('./ConnectionTable.module.scss')

type Props = {
  proposals?: Proposal[]
  onSelect?: Function
  selected?: Proposal
}

const sortByQuality = (a: Proposal, b: Proposal) => {
  const qualityA = qualityCalculator.calculateValue(a.metrics)
  const qualityB = qualityCalculator.calculateValue(b.metrics)

  if (qualityA < qualityB) {
    return 1
  }

  if (qualityA > qualityB) {
    return -1
  }

  return 0
}

const ConnectionTable = (props: Props) => (
  <div className={styles.root}>
    <TableHead/>
    <TableBody proposals={props.proposals.sort(sortByQuality)} onSelect={props.onSelect} selected={props.selected}/>
  </div>
)

export default ConnectionTable
