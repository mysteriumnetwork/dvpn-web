import * as React from 'react'
import { MenuItem } from '@material-ui/core'
import trans from '../../../../trans'

const styles = require('./SocialLinks.module.scss')

const SocialLinks = () => (
  <MenuItem button={false} className={styles.followMenuItem}>
    <div className={styles.followList}>
      <p>{trans('app.menu.follow.us')}</p>
      <ul>
        <li>
          <a href="/">
            <div className="app-icons telegram" />
          </a>
        </li>
        <li>
          <a href="/">
            <div className="app-icons medium" />
          </a>
        </li>
        <li>
          <a href="/">
            <div className="app-icons tweeter" />
          </a>
        </li>
        <li>
          <a href="/">
            <div className="app-icons reddit" />
          </a>
        </li>
        <li>
          <a href="/">
            <div className="app-icons facebook" />
          </a>
        </li>
        <li>
          <a href="/">
            <div className="app-icons github" />
          </a>
        </li>
      </ul>
    </div>
  </MenuItem>
)

export default SocialLinks
