import * as React from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Checkbox from '../../../ui-kit/components/Checkbox/Checkbox'
import { DefaultProps } from '../../../types'
import { TermsEndUser, Warranty } from '@mysteriumnetwork/terms'
import { version } from '@mysteriumnetwork/terms/package.json'
import { TermsState } from './reducer'
import TermsItem from './components/TermsItem/TermsItem'

const styles = require('./Terms.module.scss')

type Props = DefaultProps & RouteComponentProps & {
  terms: TermsState
  redirectTo: any
  onAcceptTerms: Function
  view?: boolean
}

export class Terms extends React.PureComponent<Props, { accept: boolean }> {
  constructor(props) {
    super(props)
    this.state = { accept: false }
  }

  componentDidMount() {
    const { terms } = this.props
    this.setState({ accept: Boolean(terms[version]) })
  }

  handleAcceptSubmit = () => {
    const { onAcceptTerms } = this.props
    onAcceptTerms(version)
  }

  handleAcceptChange = () => {
    this.setState({ accept: !this.state.accept })
  }

  get isView(): boolean {
    // const { state } = this.props.location
    // return Boolean(state && state.view)
    return this.props.view
  }

  render() {
    if (!this.isView && this.props.terms[version]) {
      return (<Redirect to={this.props.redirectTo}/>)
    }

    return (
      <div className={this.isView ? styles.appTermsCoverView : styles.appTermsCover}>
        <div className={styles.appTermsListCover}>
          <h2>{trans('app.onboarding.terms.title')}</h2>
          <TermsItem title={trans('app.onboarding.terms.title.terms')} body={TermsEndUser} last={version}/>
          <TermsItem title={trans('app.onboarding.terms.title.warranty')} body={Warranty} last={version}/>
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.barContent}>
            <div>
              <span className={styles.catMysterium}/>
              {!this.isView && (
                <p className={styles.termsAgreement}>
                  <Checkbox label={trans('app.onboarding.terms.agree.label')}
                            disabled={this.isView}
                            checked={this.state.accept}
                            onChange={this.handleAcceptChange}/>
                </p>
              )}
              {!this.isView && (
                <Link to={this.props.redirectTo}>
                  <Button color="primary"
                          disabled={!this.state.accept}
                          onClick={this.handleAcceptSubmit}>{trans('app.onboarding.continue.btn')}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
