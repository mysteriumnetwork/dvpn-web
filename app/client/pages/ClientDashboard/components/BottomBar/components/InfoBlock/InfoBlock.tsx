import * as React from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../trans'

const classNames = require('classnames')

interface IStyles {
  root: string
  info: string
  flagIcon: string
}

const styles = theme => ({
  root: {
    padding: 16,
    flex: '0 0.3 30%',
    minWidth: 240,
    display: 'flex',
    borderTop: '1px solid #E6E6E6',
  },
  info: {
    marginLeft: 16,
    '& > h3': {
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.buttonText,
    },
    '& > p': {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.buttonText,
    },
  },
  flagIcon: {
    width: 32,
    height: 32,
    minWidth: 32,
    background: 'url("app/components/assets/images/flag-icon-temp.svg") no-repeat center',
  },
})

export interface IInfoBlockProps {
  onChange: any
  classes: IStyles
  style?: React.CSSProperties
}

const InfoBlock: React.SFC<IInfoBlockProps> = (props: IInfoBlockProps) => (
  <div className={props.classes.root}>
    {/* render flag icon class */}
    <div
      className={classNames(props.classes.flagIcon, {
        // [props.classes.iconClass]
      })}
    />
    <div className={props.classes.info}>
      <h3>{trans('app.client.dashboard.not.connected')}</h3>
      <p>IP: 88.17.13.176</p>
    </div>
  </div>
)

export default injectSheet(styles)(InfoBlock)
