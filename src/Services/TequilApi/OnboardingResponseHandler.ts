import { ERROR, HOME } from '../../constants/routes';
import {
    BasicResponseInterface,
    CreateNewIdentityResponseInterface,
    IdentityResponseInterface,
    IdentityListResponseInterface,
    UserConfigResponseInterface,
    TransactionsFeesResponseInterface,
    CurrentIdentityResponseInterface,
} from '../../api/TequilApiResponseInterfaces';

export const tequilApiResponseHandler = (
    history: any,
    response:
        | BasicResponseInterface
        | CreateNewIdentityResponseInterface
        | IdentityResponseInterface
        | IdentityListResponseInterface
        | UserConfigResponseInterface
        | TransactionsFeesResponseInterface
        | CurrentIdentityResponseInterface,
): boolean => {
    if (response.isAuthoriseError) {
        history.push(HOME);
        return false;
    }

    if (response.isRequestFail) {
        history.push(ERROR);
        return false;
    }

    if (!response.success) {
        if (response.errorMessage) {
            console.log(response.errorMessage);
        }

        return false;
    }

    return true;
};
