import * as React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from '../../../provider/provider.links'
import trans from '../../../trans'
import { connect } from 'react-redux'
import { NAV_CLIENT_CONNECTED, NAV_CLIENT_CONNECTING, NAV_CLIENT_DASHBOARD } from '../../../client/client.links'
import AppMenu from '../AppMenu/AppMenu'
import _ from 'lodash'
import { ConnectionStatus } from 'mysterium-vpn-js'
import { RootState } from '../../../rootState.type'

const classNames = require('classnames')

interface IStyles {
  appHeader: string
  dialogHeader?: string
  tabContainer: string
  tab: string
  active: string
}

const styles = (theme: any) => ({
  appHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    position: 'relative',
    boxShadow: 'inset 0 -0.3px 0 0 #b1b1b1',
    backgroundImage: 'linear-gradient(to bottom, #d6d6d6, #cccccc 97%, #bababa)',
    '& > button': {
      padding: 6,
    },
  },
  tabContainer: {
    borderRadius: 5,
    background: '#f8f8f8',
    display: 'flex',
    boxShadow: '0 0.3px 0.3px 0 rgba(0, 0, 0, 0.15)',
    '& > a:first-child div': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderRight: 'none',
    },
    '& > a:last-child div': {
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
      borderLeft: 'none',
    },
  },
  tab: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10rem',
    height: '1.7rem',
    borderRadius: 2,
    color: theme.colors.textMain,
    fontSize: theme.typography.fontSizes.buttonText,
    boxShadow: '0 0.3px 0.3px 0 rgba(0, 0, 0, 0.15)',
    border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'linear-gradient(to bottom, #fefefe, #f2f2f2)',
  },
  active: {
    color: theme.colors.whiteColor,
    boxShadow: 'inset 0 0.5px 1px 0 #632462',
    border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
    backgroundImage: theme.colors.purpleMain,
  },
})

export interface IAppHeaderProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
  startedServices?: boolean
  connectionStatus?: ConnectionStatus
  routerLocation?: string
}

const clientLinkByConnectionStatus = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTING:
      return NAV_CLIENT_CONNECTING
    case ConnectionStatus.DISCONNECTING:
    case ConnectionStatus.CONNECTED:
      return NAV_CLIENT_CONNECTED
    default:
      return NAV_CLIENT_DASHBOARD
  }
}

const AppHeader: React.FunctionComponent<IAppHeaderProps> = (props: IAppHeaderProps) => (
  <div className={props.classes.appHeader}>
    <div className={props.classes.tabContainer}>
      {process.env.NODE_ENV !== 'production' ?
      <Link to={clientLinkByConnectionStatus(props.connectionStatus)}>
        <div
          className={classNames(props.classes.tab, {
            [props.classes.active]: String(props.routerLocation).startsWith('/client')
          })}
        >
          {trans('app.header.connect.vpn')}
        </div>
      </Link>
      : null}
      <Link to={props.startedServices ? NAV_PROVIDER_DASHBOARD : NAV_PROVIDER_SETTINGS}>
        <div
          className={classNames(props.classes.tab, {
            [props.classes.active]: String(props.routerLocation).startsWith('/provider')
          })}
        >
          {trans('app.header.provide.vpn')}
        </div>
      </Link>
    </div>
    <AppMenu/>
  </div>
)

const mapStateToProps = (state: RootState): any => ({
  routerLocation: _.get(state, 'router.location.pathname'),
  startedServices: Boolean(state.provider && state.provider.startedServices && state.provider.startedServices.length),
  connectionStatus: Boolean(state.client && state.client.connectionStatus),
})

export default injectSheet(styles)(connect(mapStateToProps)(AppHeader))
