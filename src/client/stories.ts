import { Dispatch } from 'redux'
import { getProposals } from './actions'

export const initClientDashboardStory = async (dispatch: Dispatch): Promise<any> => Promise.all([
  dispatch(getProposals())
]).catch(console.error)
