import React, { FC } from 'react'
import trans from '../../../../../trans'

const styles = require('./DashboardHelp.module.scss')

export const DashboardHelp: FC = () => (
  <div className={styles.dashboardHelp}>
    <div className={styles.title}>{trans('app.dashboard.need.help')}</div>
    {/*<a className={styles.email} href="mailto:bounty@mysterium.network">*/}
    {/*  bounty@mysterium.network*/}
    {/*</a>*/}
    <ul className={styles.followList}>
      <li>
        <a href="https://t.me/mysterium_network" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt telegram-alt"/>
        </a>
      </li>
      <li>
        <a href="https://medium.com/mysterium-network" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt medium-alt"/>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/MysteriumNet" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt tweeter-alt"/>
        </a>
      </li>
      <li>
        <a href="https://www.reddit.com/r/MysteriumNetwork/" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt reddit-alt"/>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/MysteriumNet/" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt facebook-alt"/>
        </a>
      </li>
      <li>
        <a href="https://github.com/MysteriumNetwork" target="_blank" rel="noopener noreferrer">
          <div className="app-icons app-icons-alt github-alt"/>
        </a>
      </li>
    </ul>
  </div>
)
