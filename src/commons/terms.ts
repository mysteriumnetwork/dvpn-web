/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as termsPackageJson from '@mysteriumnetwork/terms/package.json';

interface Agreement {
    at?: string;
    version?: string;
}

export const resolveTermsAgreement = (configData?: any): Agreement => {
    return configData?.mysteriumwebui?.termsAgreed || {};
};

export const areTermsAccepted = (agreedAt?: string, version?: string): boolean => {
    return !!version && !!agreedAt && version === termsPackageJson.version;
};
