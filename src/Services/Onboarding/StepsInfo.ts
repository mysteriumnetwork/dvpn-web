import sideImageOnboarding from "../../assets/images/onboarding/SideImage.png";

interface stepsInfoReturnInterface {
  step: number,
  image: string
}

export const setStepsInfo = (): stepsInfoReturnInterface => {
  switch (window.location.pathname) {
    case '/onboarding':
      return {step: 1, image: sideImageOnboarding};
    case '/onboarding/terms-and-conditions':
      return {step: 2, image: sideImageOnboarding};
    case '/onboarding/service-settings':
      return {step: 3, image: sideImageOnboarding};
    case '/onboarding/backup':
      return {step: 4, image: sideImageOnboarding};
    case '/onboarding/node-settings':
      return {step: 5, image: sideImageOnboarding};
    case '/onboarding/payout-settings':
      return {step: 6, image: sideImageOnboarding};
    case '/onboarding/terms-and-conditions':
      return {step: 7, image: sideImageOnboarding};
    default:
      return {step: 1, image: sideImageOnboarding};
  }
};