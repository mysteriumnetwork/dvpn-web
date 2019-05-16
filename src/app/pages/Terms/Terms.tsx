import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_PROVIDER_SETTINGS } from '../../../provider/provider.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Checkbox from '../../../ui-kit/components/Checkbox/Checkbox'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { fetchTermsAction } from './actions'
import ReactMarkdown from 'react-markdown'
import { DefaultProps } from '../../../types'

const styles = require('./Terms.module.scss')
type Props = DefaultProps & {
  mdText: string
  onLoadTerms: () => void
}

class Terms extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    const { onLoadTerms } = this.props
    onLoadTerms()
  }

  render() {
    const { mdText } = this.props
    return (
      <div className={styles.appTermsCover}>
        <div className={styles.appTermsListCover}>
          <ReactMarkdown
            escapeHtml={false}
            source={mdText}/>
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.barContent}>
            <div>
              <span className={styles.catMysterium}/>
              <p className={styles.termsAgreement}>
                <Checkbox label={trans('app.onboarding.terms.agree.label')}/>
              </p>
              <Link to={NAV_PROVIDER_SETTINGS}>
                <Button color="primary">{trans('app.onboarding.continue.btn')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mdText: state.terms.mdText || {}
})

const mapDispatchToProps = (dispatch) => ({
  onLoadTerms: () => dispatch(fetchTermsAction())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(Terms))
