import { getFormValues } from 'redux-form/immutable'
import { destroyProvidersStory, initProviderStory, saveSettingsStory } from '../../stories'
import { setProviderStateAction } from '../../actions'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { ProviderSettings } from './ProviderSettings'
import { NAV_PROVIDER_DASHBOARD } from '../../provider.links'

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state)
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initProviderStory(dispatch),
  onDestroy: () => destroyProvidersStory(dispatch),
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: (payload) => saveSettingsStory(dispatch, payload, NAV_PROVIDER_DASHBOARD),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(ProviderSettings))

