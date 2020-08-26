import { ONBOARD } from '../../actionTypes/OnbordingTypes';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../Services/constants';
import { authLogin } from '../../../api/TequilaApiCalls';

export const onboard = () => ({
    payload: true,
    type: ONBOARD,
});

export const shouldOnBoard = (): Function => {
    return async (dispatch: Function) => {
        const response = await authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
        dispatch({
            payload: response.success, // if login fails with default credentials, user is considered boarded
            type: ONBOARD,
        });
    };
};
