import { getFormValues, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { NAV_DASHBOARD } from '../../web.links'
import { initSettingsStory, saveSettingsStory } from '../../../provider/stories'
import { setProviderStateAction } from '../../../provider/actions'
import { RootState } from '../../../rootState.type'
import React from 'react'
import AppHeader from '../AppHeader'
import { ProviderSettings } from '../../../provider/pages/ProviderSettings/ProviderSettings'
import validate from '../../../provider/pages/ProviderSettings/components/AirdropWallet/validate'

const mapStateToProps = (state: RootState) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state),
  configDefaults: state.app.configDefaults || {},
  configData: state.app.configData || {},
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initSettingsStory(dispatch),
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: (payload) => saveSettingsStory(dispatch, payload, NAV_DASHBOARD),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReduxForm = reduxForm({
  form: 'walletAddress',
  validate,
})

const SettingsPage = withStyles({})(compose(withConnect, withReduxForm, immutableProps)(ProviderSettings))

export default () => (
  <div>
    <AppHeader/>
    <SettingsPage/>
  </div>
)
