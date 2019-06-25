import * as React from 'react'
import injectSheet from 'react-jss'
import ItemServer from './components/ItemServer'
import ItemQuality from './components/ItemQuality'
import ItemConnectionType from './components/ItemConnectionType'
import { Proposal } from 'mysterium-vpn-js'

interface IStyles {
  highlight: string
  hovered: string
}

const styles = (theme) => ({
  highlight: {
    background: theme.colors.actionPurple
  },
  hovered: {
    '&:hover': {
      backgroundColor: theme.colors.grayBackground
    }
  }
})

export interface IItemProps {
  classes: IStyles
  style?: React.CSSProperties
  proposal: Proposal
  onSelect?: Function
  active?: boolean
}

class ConnectionItem extends React.PureComponent<IItemProps> {
  handleRowClick = () => {
    const { proposal, onSelect } = this.props

    return onSelect && onSelect(proposal)
  }

  render() {
    const { proposal, active, classes } = this.props

    return (
      <tr onClick={this.handleRowClick} className={active ? classes.highlight : classes.hovered}>
        <ItemServer proposal={proposal} active={active}/>
        <ItemConnectionType proposal={proposal} active={active}/>
        <ItemQuality proposal={proposal} active={active}/>
      </tr>
    )
  }
}

export default injectSheet(styles)(ConnectionItem)
