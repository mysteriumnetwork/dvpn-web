import { getFormValues } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { NAV_DASHBOARD } from '../../web.links'
import { ProviderSettings } from '../../../provider/pages/ProviderSettings/ProviderSettings'
import { destroyProvidersStory, initProviderStory, saveSettingsStory } from '../../../provider/stories'
import { setProviderStateAction } from '../../../provider/actions'

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state)
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initProviderStory(dispatch),
  onDestroy: () => destroyProvidersStory(dispatch),
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: (payload) => saveSettingsStory(dispatch, payload, NAV_DASHBOARD),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(ProviderSettings))

