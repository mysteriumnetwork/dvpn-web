// eslint-disable-next-line import/prefer-default-export
import { FormStateMap } from 'redux-form'
import { ProviderState } from './provider/reducer'
import { ClientState } from './client/reducer'
import { TermsState } from './app/pages/Terms/reducer'
import { RouterState } from 'connected-react-router'

export type RootState = {
  timer: number,
  router: RouterState,
  form: FormStateMap,
  language: any,
  provider: ProviderState,
  client: ClientState,
  terms: TermsState
}
