import * as React from 'react'
import { Proposal } from 'mysterium-vpn-js'
import trans from '../../../../../../../../../../trans'
import ConnectionTypeIcon from '../../../../../../../../../../ui-kit/components/ConnectionTypeIcon'
import injectSheet from 'react-jss'

const classNames = require('classnames')

interface IStyles {
  ipItem: string
  highlight: string
}

const styles = theme => ({
  ipItem: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      marginLeft: 8
    }
  },
  highlight: {
    '& > p': {
      color: theme.colors.whiteColor
    }
  }
})

export interface IItemProps {
  classes: IStyles
  style?: React.CSSProperties
  proposal: Proposal
  active?: boolean
}

const ItemConnectionType: React.FunctionComponent<IItemProps> = (props: IItemProps) => (
  <td>
    <div
      className={classNames(props.classes.ipItem, {
        [props.classes.highlight]: props.active
      })}
    >
      <ConnectionTypeIcon type={props.proposal.serviceType}/>
      <p>{trans(`connection.type.${props.proposal.serviceType}`)}</p>
    </div>
  </td>
)

export default injectSheet(styles)(ItemConnectionType)
