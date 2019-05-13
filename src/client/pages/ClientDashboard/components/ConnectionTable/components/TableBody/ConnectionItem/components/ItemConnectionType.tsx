import * as React from 'react'
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
      marginLeft: 8,
    },
    '& .iconWireGuard': {
      width: 24,
      height: 24,
      minWidth: 24,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '184px 232px',
      backgroundPosition: '-52px -36px',
    },
  },
  highlight: {
    '& > p': {
      color: theme.colors.whiteColor,
    },
    '& .iconWireGuard': {
      backgroundPosition: '-76px -60px',
    },
  },
})

export interface IItemProps {
  classes: IStyles
  style?: React.CSSProperties
}

const ItemConnectionType: React.SFC<IItemProps> = (props: IItemProps) => (
  <td>
    <div
      className={classNames(props.classes.ipItem, {
        // set class highlight when item selected
        // [props.classes.highlight]&&selected
      })}
    >
      <div className="iconWireGuard" />
      <p>172.93.13.176</p>
    </div>
  </td>
)

export default injectSheet(styles)(ItemConnectionType)
