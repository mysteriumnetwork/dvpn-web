import { Dispatch } from 'redux'
import { authAuthLoginAction, authPasswordChangeAction } from './actions'
import { initAppFetchStory } from '../provider/stories'

export const loginStory = async (dispatch: Dispatch, value: any) => {
  await dispatch(authAuthLoginAction(value))
  await initAppFetchStory(dispatch)
}

export const passwordChangeStory = async (dispatch: Dispatch, value: any) => {
  await dispatch(authPasswordChangeAction(value))
}
