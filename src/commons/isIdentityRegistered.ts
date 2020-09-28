import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js';

export default (identity?: Identity): boolean => {
    const { Registered, InProgress } = IdentityRegistrationStatus;

    return !!identity && (identity.registrationStatus === Registered || identity.registrationStatus === InProgress);
};
