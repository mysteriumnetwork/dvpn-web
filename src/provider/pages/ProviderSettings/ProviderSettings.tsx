import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { connect } from 'react-redux'
import { ProviderState } from '../../reducer'
import { DefaultProps } from '../../../types'
import { withStyles } from '@material-ui/core'
import { destroyProvidersStory, initProviderStory, saveSettingsStory, } from '../../stories'
import { getFormValues } from 'redux-form/immutable'
import { compose } from 'redux'
import _ from 'lodash'
import immutableProps from '../../../hocs/immutableProps'
import ErrorDialog from '../../../ui-kit/components/ErrorDialog'
import { setProviderStateAction } from '../../actions'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderState
  formWalletAddressData?: Object
  onSetState?: (data: Object) => void
  onChangeTrafficOption: (value: string) => void
  onInit?: Function
  onDestroy?: Function
  onSaveSettings?: Function
}

class ProviderSettings extends React.PureComponent<Props> {
  private submitForm: Function

  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  componentWillUnmount() {
    const { onDestroy } = this.props

    return onDestroy && onDestroy()
  }

  handleInitForm = (submit) => {
    this.submitForm = submit
  }

  handleSaveSettings = () => {
    this.submitForm && this.submitForm()
  }

  handleCloseErrorDialog = () => {
    const { onSetState } = this.props

    onSetState({
      generalError: null
    })
  }

  render() {
    const { provider } = this.props

    const id = (provider && provider.identity && provider.identity.id) || ''

    return (<div className={styles.appProviderSettingsCover}>
      <div className={styles.scrollView}>
        <h1>{trans('app.provider.settings.share.your.connection')}</h1>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.flexedRow}>
              <p>{trans('app.provider.settings.my.id')}</p>
              <div title={id}>{id.substr(2)}</div>
            </div>
            {/* render dynamic Airdrop Wallet */}
            <AirdropWallet {...this.props} onInitForm={this.handleInitForm}/>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button
          onClick={this.handleSaveSettings}
          color="primary"
        >
          {trans('app.provider.settings.save')}
        </Button>
      </div>
      {_.get(provider, 'state.generalError') && (
        <ErrorDialog onClose={this.handleCloseErrorDialog}>
          {_.get(provider, 'state.generalError')}
        </ErrorDialog>
      )}

    </div>)
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state)
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initProviderStory(dispatch),
  onDestroy: () => destroyProvidersStory(dispatch),
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: (payload) => saveSettingsStory(dispatch, payload),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(ProviderSettings))

