/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface OnboardingData {
    onboarded: boolean;
}

export interface OnboardingState {
    isDefaultCredentials: boolean;
    isLoading: boolean;
}

export interface OnboardingAction<T> extends Action {
    type: string;
    payload: T;
}

export type OnboardingTypes = OnboardingAction;
