import * as React from 'react'
import { connect } from 'react-redux';

import TableHead from './components/TableHead/TableHead'
import TableBody from './components/TableBody/TableBody'
import { Proposal } from 'mysterium-vpn-js'
import { qualityCalculator } from '../../../../../utils/quality-calculator'

const styles = require('./ConnectionTable.module.scss')

type Props = {
  proposals?: Proposal[]
  onSelect?: Function
  selected?: Proposal
  isAskSortProposal: boolean
}

class ConnectionTable extends React.PureComponent<Props> {
  sortByQuality = (a: Proposal, b: Proposal, isAskSortProposal: boolean) => {
    const qualityA = qualityCalculator.calculateValue(isAskSortProposal ? a.metrics : b.metrics)
    const qualityB = qualityCalculator.calculateValue(isAskSortProposal ? b.metrics : a.metrics)

    if (typeof qualityA !== 'number') {
      return 1
    }

    if (typeof qualityB !== 'number') {
      return -1
    }

    return qualityB - qualityA
  }

  getSortedProposals = () => {
    const { proposals, isAskSortProposal } = this.props

    return proposals.sort((a, b) => this.sortByQuality(a, b, isAskSortProposal))
  }

  render() {
    const { onSelect, selected } = this.props
    const sortedProposals = this.getSortedProposals();

    return (
        <div className={styles.root}>
          <TableHead />
          <TableBody
              proposals={sortedProposals}
              onSelect={onSelect}
              selected={selected}
          />
        </div>
    )
  }
}

const mapStateToProps = ({ client: { isAskSortProposal } }) => ({ isAskSortProposal })

export default connect(mapStateToProps, null)(ConnectionTable)
