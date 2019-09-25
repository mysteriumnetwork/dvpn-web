import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import { DefaultProps } from '../../../types'
import { TermsState } from '../Terms/reducer'
import { version } from '@mysteriumnetwork/terms/package.json'

const styles = require('./Welcome.module.scss')

type Props = DefaultProps & {
  terms: TermsState
  redirectTo: any
}

export const Welcome = (props: Props) => (props.terms[version])
  ? (<Redirect to={props.redirectTo}/>)
  : (
    <div className={styles.appCover}>
      <div className={styles.appBgPattern}/>
      <div className={styles.appContent}>
        <div className={styles.logo}/>
        <h1>{trans('app.onboarding.welcome')}</h1>
        <h4>{trans('app.onboarding.subtitle')}</h4>
        <Link to={props.redirectTo}>
          <Button color="primary">{trans('app.onboarding.get.started.btn')}</Button>
        </Link>
      </div>
    </div>
  )

