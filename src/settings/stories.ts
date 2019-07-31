import { Dispatch } from 'redux'
import { authPasswordChangeAction } from './actions'

export const passwordChangeStory = async (dispatch: Dispatch, value: any) => {
  await dispatch(authPasswordChangeAction(value))
}
