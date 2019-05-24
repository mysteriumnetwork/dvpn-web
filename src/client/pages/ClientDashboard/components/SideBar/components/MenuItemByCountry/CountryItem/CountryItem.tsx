import * as React from 'react'
import { MouseEventHandler } from 'react'
import injectSheet from 'react-jss'
import FlagIcon from '../../../../../../../../ui-kit/components/FlagIcon'

const classNames = require('classnames')

interface IStyles {
  root: string
  menuItem: string
  active: string
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
    '& .flag-icon': {
      marginRight: 12,
    },
    '& .itemsCount': {
      position: 'absolute',
      top: 10,
      right: 10,
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
    '& .itemsCount': {
      opacity: '0.5',
      color: theme.colors.whiteColor,
    },
  },
})

export interface IMenuItemProps {
  classes: IStyles
  style?: React.CSSProperties
  onClick?: MouseEventHandler
  country?: string
  count?: number
  active?: string
}

const CountryItem: React.FunctionComponent<IMenuItemProps> = (props: IMenuItemProps) => (
  <div className={props.classes.root}>
    <button type="submit" onClick={props.onClick}>
      <div className={classNames(props.classes.menuItem, { [props.classes.active]: props.active })}>
        <FlagIcon code={String(props.country).toLowerCase()}/>
        <p>{props.country}</p>
        <div className="itemsCount">{props.count}</div>
      </div>
    </button>
  </div>
)

export default injectSheet(styles)(CountryItem)
