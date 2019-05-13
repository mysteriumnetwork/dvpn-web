import * as React from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../../trans'

const classNames = require('classnames')

interface IStyles {
  root: string
  flagIcon: string
}

const styles = theme => ({
  root: {
    display: 'flex',
    marginRight: 16,
    '& > p': {
      opacity: '0.9',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.tableHeadFont,
    },
  },
  flagIcon: {
    width: 16,
    height: 16,
    minWidth: 16,
    marginRight: 8,
    background: 'url("app/components/assets/images/flag-icon-temp.svg") no-repeat center',
    backgroundSize: 'contain',
  },
})

export interface ICountryItemProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

const CountryItem: React.SFC<ICountryItemProps> = (props: ICountryItemProps) => (
  <div className={props.classes.root}>
    {/* render flag icon class */}
    <div
      className={classNames(props.classes.flagIcon, {
        // [props.classes.iconClass]
      })}
    />
    <p>{trans('app.client.side.bar.ireland')}</p>
  </div>
)

export default injectSheet(styles)(CountryItem)
