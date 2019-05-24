import * as React from 'react'
import { MouseEventHandler } from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../trans'

const classNames = require('classnames')

interface IStyles {
  root: string
  menuItem: string
  active: string
}

const styles = theme => ({
  root: {
    '& > h3': {
      padding: '6px 14px',
      fontSize: theme.typography.fontSizes.buttonText,
      color: theme.colors.textLightGrey
    },
    '& > button': {
      width: '100%'
    }
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 14px',
    position: 'relative',
    borderRadius: 4,
    marginBottom: 2,
    color: theme.colors.textMain,
    '& .iconWireGuard': {
      width: 24,
      height: 24,
      minWidth: 24,
      marginRight: 10,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '184px 232px',
      backgroundPosition: '-52px -60px'
    },
    '& .iconOpenVPN': {
      width: 24,
      height: 24,
      minWidth: 24,
      marginRight: 10,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '184px 232px',
      backgroundPosition: '-52px -36px'
    },
    '& .itemsCount': {
      position: 'absolute',
      top: 10,
      right: 14,
      color: theme.colors.textLightGrey
    }
  },
  active: {
    color: theme.colors.whiteColor,
    background: theme.colors.actionPurple,
    '& .itemsCount': {
      opacity: '0.5',
      color: theme.colors.whiteColor
    },
    '& .iconWireGuard': {
      backgroundPosition: '-76px -60px'
    },
    '& .iconOpenVPN': {
      backgroundPosition: '-76px -36px'
    }
  }
})

export interface IMenuItemProps {
  classes: IStyles
  style?: React.CSSProperties,
  onClick?: MouseEventHandler
  list?: {name: string, value: string}[]
  active?: string
}

const MenuByConnectionType: React.FunctionComponent<IMenuItemProps> = (props: IMenuItemProps) => (
  <div className={props.classes.root}>
    <h3>{trans('app.client.side.bar.by.connection.type')}</h3>
    <button onClick={props.onClick}>
      <div
        className={classNames(props.classes.menuItem, {
          // add class active when item selected
          // [props.classes.active]
        })}
      >
        <div className="iconWireGuard"/>
        <p>WireGuard</p>
        <div className="itemsCount">1</div>
      </div>
    </button>
    <button onClick={props.onClick}>
      <div
        className={classNames(props.classes.menuItem, {
          // add class active when item selected
          // [props.classes.active]
        })}
      >
        <div className="iconOpenVPN"/>
        <p>OpenVPN</p>
        <div className="itemsCount">2</div>
      </div>
    </button>
  </div>
)

export default injectSheet(styles)(MenuByConnectionType)
