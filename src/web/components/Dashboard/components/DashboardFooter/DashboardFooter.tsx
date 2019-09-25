import React, { FC } from 'react'
import trans from '../../../../../trans'
import { Link } from 'react-router-dom'
import { NAV_TERMS_VIEW } from '../../../../../app/app.links'
import { NodeHealthcheck } from 'mysterium-vpn-js'

const styles = require('./DashboardFooter.module.scss')

type Props = {
  node: NodeHealthcheck,
}

export const DashboardFooter: FC<Props> = (props) => (
  <div className={styles.dashboardFooter}>
    <ul className={styles.footerMenu}>
      <li>
        <a className={styles.menuItem} href="/">
          {trans('app.menu.faq')}
        </a>
      </li>
      <li>
        <Link className={styles.menuItem} to={{ pathname: NAV_TERMS_VIEW }}>
          {trans('app.menu.terms.conditions')}
        </Link>
      </li>
      <li>
        <a className={styles.menuItem} href="/">
          {trans('app.menu.privacy.policy')}
        </a>
      </li>
    </ul>
    <div className={styles.version}>
      {`${trans('app.about.version')} ${(props.node && props.node.version) || '...'}`}
    </div>
  </div>
)
