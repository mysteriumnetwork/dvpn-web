import * as React from 'react'
import trans from '../../../../../trans'

const styles = require('./TermsItem.scss')

const TermsItem = () => (
  <div className={styles.termsItem}>
    <h3>{trans('app.onboarding.terms.title.1')}</h3>
    <p className={styles.termsItemText}>
      The following Terms and Conditions (“T&amp;C”) govern the use of the Mysterium open...
      <a href="/">{trans('app.onboarding.more.btn')}</a>
    </p>
    <p className={styles.date}>Last updated 2018-12-11</p>
  </div>
)

export default TermsItem
