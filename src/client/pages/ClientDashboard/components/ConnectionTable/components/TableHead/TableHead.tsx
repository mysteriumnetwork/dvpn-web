import * as React from 'react'
import { connect } from 'react-redux';

import trans from '../../../../../../../trans'
import { toggleAskProposal } from '../../../../../../actions';

const styles = require('./TableHead.module.scss')

type Props = {
    isAskSortProposal: boolean,
    toggleAskProposal: Function
}


class TableHead extends React.PureComponent<Props> {
    handleToggleAskProposal = () => this.props.toggleAskProposal(!this.props.isAskSortProposal)

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
                                Sort: Quality
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
    toggleAskProposal: (isAskSortProposal) => dispatch(toggleAskProposal(isAskSortProposal)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableHead)
