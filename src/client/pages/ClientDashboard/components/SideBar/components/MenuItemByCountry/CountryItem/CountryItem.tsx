import * as React from 'react'
import { MouseEventHandler } from 'react'
import injectSheet from 'react-jss'
import FlagIcon from '../../../../../../../../ui-kit/components/FlagIcon'

const classNames = require('classnames')

interface IStyles {
  root: string
  menuItem: string
  flagIcon: string
  active: string
}

const styles = theme => ({
  root: {
    width: '100%',
    outline: 'none',
    border: 'none',
    background: 'transparent',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 14px',
    position: 'relative',
    borderRadius: 4,
    marginBottom: 2,
    color: theme.colors.textMain,
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
  flagIcon: {
    margin: '2px 8px 2px 2px',
    width: 20,
    height: 20
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
  active?: boolean
}

const CountryItem: React.FunctionComponent<IMenuItemProps> = (props: IMenuItemProps) => (
  <button type="button" className={props.classes.root} onClick={props.onClick}>
    <div className={classNames(props.classes.menuItem, { [props.classes.active]: props.active })}>
      <FlagIcon className={props.classes.flagIcon} code={String(props.country).toLowerCase()}/>
      <p>{props.country}</p>
      <div className="itemsCount">{props.count}</div>
    </div>
  </button>
)

export default injectSheet(styles)(CountryItem)
