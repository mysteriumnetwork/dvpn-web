export interface OnboardingData {
  onboarded: boolean;
}

export interface OnboardingState {
  onboarded: boolean;
}

export interface OnboardingAction<T> extends Action {
  type: string;
  payload: T;
}

export type OnboardingTypes = OnboardingAction;