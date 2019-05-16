import * as React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from '../../../provider/provider.links'
import { NAV_CLIENT_DASHBOARD } from '../../../client/client.links'
import trans from '../../../trans'
import AppMenu from '../AppMenu/AppMenu'
import { connect } from 'react-redux'

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
      borderRadius: '4px 0 0 4px',
      borderRight: 'none',
    },
    '& > a:last-child div': {
      borderRadius: '0 4px 4px 0',
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
  started?: boolean
}

const AppHeader: React.SFC<IAppHeaderProps> = (props: IAppHeaderProps) => (
  <div className={props.classes.appHeader}>
    <div className={props.classes.tabContainer}>
      {/*<Link to={NAV_CLIENT_DASHBOARD}>*/}
      {/*  <div*/}
      {/*    className={classNames(props.classes.tab, {*/}
      {/*      // add class active when tab is open*/}
      {/*      //   [props.classes.active]&&selected*/}
      {/*    })}*/}
      {/*  >*/}
      {/*    {trans('app.header.connect.vpn')}*/}
      {/*  </div>*/}
      {/*</Link>*/}
      <Link to={props.started ? NAV_PROVIDER_DASHBOARD : NAV_PROVIDER_SETTINGS}>
        <div
          className={classNames(props.classes.tab, {
            // add class active when tab is open
            //   [props.classes.active]&&selected
          })}
        >
          {trans('app.header.provide.vpn')}
        </div>
      </Link>
    </div>
    {/*<AppMenu />*/}
  </div>
)

const mapStateToProps = (state) => ({
  started: Boolean(state.provider && state.provider.startedService)
})

export default injectSheet(styles)(connect(mapStateToProps)(AppHeader))
