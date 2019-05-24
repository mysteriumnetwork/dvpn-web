import * as React from 'react'
import { MouseEventHandler } from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../trans'

const classNames = require('classnames')

interface IStyles {
  root: string
  itemsCount: string
  faveIcon: string
  menuItem: string
  active: string
}

const styles = theme => ({
  root: {
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
    '& .faveIcon': {
      width: 24,
      height: 24,
      minWidth: 24,
      marginRight: 10,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '184px 232px',
      backgroundPosition: '4px -62px'
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
    '& .faveIcon': {
      backgroundPosition: '-20px -62px'
    },
    '& .itemsCount': {
      opacity: '0.5',
      color: theme.colors.whiteColor
    }
  }
})

export interface IMenuItemFavoriteProps {
  classes: IStyles
  style?: React.CSSProperties,
  onClick?: MouseEventHandler
  count?: number
  active?: boolean
}

const MenuItemFavorite: React.FunctionComponent<IMenuItemFavoriteProps> = (props: IMenuItemFavoriteProps) => (
  <div className={props.classes.root}>
    <button onClick={props.onClick}>
      <div
        className={classNames(props.classes.menuItem, {
          [props.classes.active]: Boolean(props.active)
        })}
      >
        <div className="faveIcon"/>
        <p>{trans('app.client.side.bar.favorites')}</p>
        <div className="itemsCount">{Number(props.count)}</div>
      </div>
    </button>
  </div>
)

export default injectSheet(styles)(MenuItemFavorite)
