/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
    ONBOARDING_HOME,
    ONBOARDING_IDENTITY_BACKUP,
    ONBOARDING_NODE_SETTINGS,
    ONBOARDING_PAYOUT_SETTINGS,
    ONBOARDING_SERVICE_SETTINGS,
    ONBOARDING_TERMS,
} from '../../constants/routes';
import sideImageOnboarding from '../../assets/images/onboarding/SideImage.png';

interface stepsInfoReturnInterface {
    step: number;
    image: string;
}

export const setStepsInfo = (): stepsInfoReturnInterface => {
    switch (window.location.pathname) {
        case ONBOARDING_HOME:
            return { step: 1, image: sideImageOnboarding };
        case ONBOARDING_TERMS:
            return { step: 2, image: sideImageOnboarding };
        case ONBOARDING_SERVICE_SETTINGS:
            return { step: 3, image: sideImageOnboarding };
        case ONBOARDING_IDENTITY_BACKUP:
            return { step: 4, image: sideImageOnboarding };
        case ONBOARDING_PAYOUT_SETTINGS:
            return { step: 5, image: sideImageOnboarding };
        case ONBOARDING_NODE_SETTINGS:
            return { step: 6, image: sideImageOnboarding };
        default:
            return { step: 1, image: sideImageOnboarding };
    }
};
