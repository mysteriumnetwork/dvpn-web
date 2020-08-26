import { authLogin } from '../api/TequilaApiCalls';
import { BasicResponseInterface } from '../api/TequilApiResponseInterfaces';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from './constants';

export const getInitialRoute = (): Promise<BasicResponseInterface> => {
    return authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
};
