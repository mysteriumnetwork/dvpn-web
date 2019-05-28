import * as React from 'react'
import { MouseEventHandler } from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../trans'
import icons from 'app/components/assets/images/app-icons.svg'

const classNames = require('classnames')

interface IStyles {
  root: string
  menuItem: string
  active: string
  itemsCount: string
  allIcon: string
}

const styles = theme => ({
  root: {
    '& > button': {
      width: '100%',
      outline: 'none',
      border: 'none',
      background: 'transparent',
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 14px',
    position: 'relative',
    borderRadius: 4,
    marginBottom: 2,
    color: theme.colors.textMain,
    '& .allIcon': {
      width: 24,
      height: 24,
      minWidth: 24,
      marginRight: 6,
      background: `url(${icons}) no-repeat`,
      backgroundSize: '184px 232px',
      backgroundPosition: '4px -36px',
    },
    '& .itemsCount': {
      position: 'absolute',
      top: 10,
      right: 14,
      fontSize: 14,
      color: theme.colors.textLightGrey,
    },
    '& > p': {
      fontSize: 14,
    },
  },
  active: {
    color: theme.colors.whiteColor,
    background: theme.colors.actionPurple,
    '& .allIcon': {
      backgroundPosition: '-20px -36px',
    },
    '& .itemsCount': {
      opacity: '0.5',
      color: theme.colors.whiteColor,
    },
  },
})

export interface IMenuItemAllProps {
  classes: IStyles
  style?: React.CSSProperties
  onClick?: MouseEventHandler
  count?: number
  active?: boolean
}

const MenuItemAll: React.FunctionComponent<IMenuItemAllProps> = (props: IMenuItemAllProps) => (
  <div className={props.classes.root}>
    <button type="button" onClick={props.onClick}>
      <div className={classNames(props.classes.menuItem, { [props.classes.active]: Boolean(props.active) })}>
        <div className="allIcon"/>
        <p>{trans('app.client.side.bar.all')}</p>
        <div className="itemsCount">{Number(props.count)}</div>
      </div>
    </button>
  </div>
)

export default injectSheet(styles)(MenuItemAll)
