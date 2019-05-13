import * as React from 'react'
import injectSheet from 'react-jss'
import { DialogContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD } from '../../../../../client/client.links'
import Button from '../../../../../ui-kit/components/Button/Button'
import trans from '../../../../../trans'

interface IStyles {
  rootStyled: string
  textStyled: string
  action: string
  image: string
}

const styles = (theme: any) => ({
  rootStyled: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#D7D7D7',
  },
  textStyled: {
    fontSize: theme.typography.fontSizes.mainTitle,
    color: theme.colors.textSecondary,
    margin: '2rem 0',
  },
  action: {
    margin: '12px auto 0',
    '& > a > button': {
      minWidth: '160px !important',
    },
    '& > a:first-child button': {
      padding: '4px 10px',
      marginRight: '1rem',
      color: theme.colors.textMain,
      borderRadius: 4,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
      border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
      backgroundImage: theme.colors.greyMain,
    },
  },
  image: {
    height: 96,
    width: 96,
    background: 'url("app/components/assets/images/network-error.svg") no-repeat',
  },
})

export interface IDialogContentProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

const AppDialogContent: React.SFC<IDialogContentProps> = (props: IDialogContentProps) => (
  <DialogContent classes={{ root: props.classes.rootStyled }}>
    <div className={props.classes.image} />
    {/* set warning message text */}
    {/* no connection: 'app.warning.message.no.internet.connection' */}
    {/* mysterium down: 'app.warning.message.mysterium.service.down' */}
    <p className={props.classes.textStyled}>{trans('app.warning.message.mysterium.service.down')}</p>
    <div className={props.classes.action}>
      <a href="/">
        <Button>{trans('app.warning.report.problem')}</Button>
      </a>
      <Link to={NAV_CLIENT_DASHBOARD}>
        <Button color="primary">{trans('app.warning.retry')}</Button>
      </Link>
    </div>
  </DialogContent>
)

export default injectSheet(styles)(AppDialogContent)
