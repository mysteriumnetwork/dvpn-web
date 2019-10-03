// eslint-disable-next-line import/prefer-default-export
import { FormStateMap } from 'redux-form'
import { ProviderState } from './provider/reducer'
import { ClientState } from './client/reducer'
import { TermsState } from './app/pages/Terms/reducer'
import { RouterState } from 'connected-react-router'
import { AppState } from './app/reducer'

export type RootState = {
  timer: number,
  language: any,
  router: RouterState,
  form: FormStateMap,
  provider: ProviderState,
  client: ClientState,
  terms: TermsState,
  app: AppState
}
