import * as React from 'react'
import { connect } from 'react-redux';

import trans from '../../../../../../../trans'
import { toggleAskProposalAction } from '../../../../../../actions';

const styles = require('./TableHead.module.scss')

type Props = {
    isAskSortProposal: boolean,
    onToggleAskProposal: Function
}

class TableHead extends React.PureComponent<Props> {
    handleToggleAskProposal = () => this.props.onToggleAskProposal(!this.props.isAskSortProposal)

    render() {
        return (
            <div className={styles.root}>
                <table>
                    <thead>
                    <tr>
                        <th>{trans('app.client.dashboard.server')}</th>
                        <th>{trans('app.client.dashboard.connection.type')}</th>
                        <th>
                            <button onClick={this.handleToggleAskProposal}>
                                Sort: Quality {this.props.isAskSortProposal
                                    ? <React.Fragment>&#8593;</React.Fragment>
                                    : <React.Fragment>&#8595;</React.Fragment>}
                            </button>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({ client: { isAskSortProposal } }) => ({ isAskSortProposal })

const mapDispatchToProps = (dispatch) => ({
    onToggleAskProposal: (isAskSortProposal) => dispatch(toggleAskProposalAction(isAskSortProposal)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableHead)
