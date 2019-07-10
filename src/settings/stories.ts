import { Dispatch } from 'redux'
import { authAuthLoginAction, authPasswordChangeAction } from './actions'
import { initAppFetchStory, initServerEventsStory } from '../provider/stories'

export const loginStory = async (dispatch: Dispatch, value: any, services: any) => {
  await dispatch(authAuthLoginAction(value))
  await initAppFetchStory(dispatch)
  initServerEventsStory(dispatch, services)
}

export const passwordChangeStory = async (dispatch: Dispatch, value: any) => {
  await dispatch(authPasswordChangeAction(value))
}
