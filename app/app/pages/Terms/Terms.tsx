import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_PROVIDER_SETTINGS } from '../../../provider/provider.links'
import TermsItem from './components/TermsItem/TermsItem'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Checkbox from '../../../ui-kit/components/Checkbox/Checkbox'

const styles = require('./Terms.scss')

const Terms = () => (
  <div className={styles.appTermsCover}>
    <div className={styles.appTermsListCover}>
      <h2>{trans('app.onboarding.terms.title')}</h2>
      {/* Render Terms Items */}
      <TermsItem />
      <TermsItem />
      <TermsItem />
    </div>
    <div className={styles.bottomBar}>
      <div className={styles.barContent}>
        <div>
          <span className={styles.catMysterium} />
          <p className={styles.termsAgreement}>
            <Checkbox label={trans('app.onboarding.terms.agree.label')} />
          </p>
          <Link to={NAV_PROVIDER_SETTINGS}>
            <Button color="primary">{trans('app.onboarding.continue.btn')}</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Terms
