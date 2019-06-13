import * as React from 'react'
import { Divider, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { NAV_SETTINGS_PASSWORD } from 'settings/settings.links'
import trans from '../../../trans'
import SocialLinks from './components/SocialLinks'

import styles from './AppMenu.module.scss'

class AppMenu extends React.Component {
  public state = {
    anchorEl: null,
  }

  private handleMenuOpen = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const buttonProps: any = {
      'aria-owns': open ? 'menu-appbar' : null,
      open: Boolean(anchorEl),
      onClick: this.handleMenuOpen,
    }

    return (
      <div className={styles.menuContainer}>
        <IconButton {...buttonProps}>
          <div className="app-icons appMenuIcon"/>
        </IconButton>
        <Menu id="menu-appbar" open={open} anchorEl={anchorEl} onClose={this.handleMenuClose}>
          {/*<MenuItem className={styles.menuItem}>{trans('app.menu.connection.history')}</MenuItem>*/}

          <MenuItem className={styles.groupItem} button={false}>Settings</MenuItem>

          <Link to={NAV_SETTINGS_PASSWORD} onClick={this.handleMenuClose}>
            <MenuItem  className={styles.menuItem}>
              {trans('app.menu.settings.password')}
            </MenuItem>
          </Link>

          <Divider/>

          <MenuItem className={styles.menuItem}>{trans('app.menu.terms.conditions')}</MenuItem>
          <MenuItem className={styles.menuItem}>{trans('app.menu.privacy.policy')}</MenuItem>
          <MenuItem className={styles.menuItem}>{trans('app.menu.send.feedback')}</MenuItem>
          <SocialLinks/>
          <Divider/>
          <MenuItem className={styles.menuItem}>{trans('app.menu.about')}</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default AppMenu
