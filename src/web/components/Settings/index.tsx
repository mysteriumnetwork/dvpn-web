import { getFormValues } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { NAV_DASHBOARD } from '../../web.links'
import { saveSettingsStory } from '../../../provider/stories'
import { setProviderStateAction } from '../../../provider/actions'
import { RootState } from '../../../rootState.type'
import React, { FC } from 'react'
import AppHeader from '../AppHeader'
import { ProviderSettings } from '../../../provider/pages/ProviderSettings/ProviderSettings'

export const SettingsPage: FC<any> = (props) => (
  <div>
    <AppHeader/>
    <ProviderSettings {...props}/>
  </div>
)

const mapStateToProps = (state: RootState) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state),
  configData: state.app.configData || {},
})

const mapDispatchToProps = (dispatch) => ({
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: (payload) => saveSettingsStory(dispatch, payload, NAV_DASHBOARD),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(SettingsPage))

