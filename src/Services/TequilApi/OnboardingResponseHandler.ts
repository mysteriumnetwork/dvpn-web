/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
