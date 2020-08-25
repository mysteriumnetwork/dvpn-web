import {SESSION_FETCH_FULFILLED} from '../../actionTypes/DashboardTypes'
import {tequilapiClient} from "../../../api/TequilApiClient";

export const fetchSessions = () => {
    return async (dispatch: Function) => {
        const sessions = await tequilapiClient.sessions()
        dispatch({
            type: SESSION_FETCH_FULFILLED,
            payload: sessions
        })
    }
}