import * as React from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../trans'
import ConnectionTypeIcon from '../../../../../../../ui-kit/components/ConnectionTypeIcon'

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
    '& .itemsCount': {
      position: 'absolute',
      top: 10,
      right: 14,
      color: theme.colors.textLightGrey
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
      color: theme.colors.whiteColor
    }
  }
})

export interface IMenuItemProps {
  classes: IStyles
  style?: React.CSSProperties,
  onClick?: Function
  counts?: Map<string, number>
  active?: string
}

class MenuByConnectionType extends React.PureComponent<IMenuItemProps> {

  render() {
    const { classes, counts, active, onClick } = this.props

    return (
      <div className={classes.root}>
        <h3>{trans('app.client.side.bar.by.connection.type')}</h3>
        {counts && Array.from(counts).map(([type, count]) => (
          <button type="button" onClick={() => onClick && onClick(type)}>
            <div className={classNames(classes.menuItem, { [classes.active]: Boolean(active) })}>
              <ConnectionTypeIcon type={type}/>
              <p>{trans(`connection.type.${type}`)}</p>
              <div className="itemsCount">{Number(count)}</div>
            </div>
          </button>
        ))}
      </div>
    )
  }
}

export default injectSheet(styles)(MenuByConnectionType)
