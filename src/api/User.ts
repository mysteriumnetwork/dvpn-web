import {DEFAULT_IDENTITY_PASSPHRASE} from '../Services/constants'
import {tequilapiClient} from './TequilApiClient'
import * as termsPackageJson from "@mysteriumnetwork/terms/package.json"
import {IdentityRef} from "mysterium-vpn-js";

export interface AuthResponseInterface {
  success: boolean,
  isAuthoriseError: boolean,
  isRequestFail: boolean
}

export interface AuthChangePasswordResponseInterface {
  success: boolean,
  isAuthoriseError: boolean,
  isRequestFail: boolean
}

export const authChangePassword = async (data: { username: string, oldPassword: string, newPassword: string }): Promise<AuthChangePasswordResponseInterface> => {
  const {newPassword, oldPassword, username} = data;
  try {
    await tequilapiClient.authChangePassword(username, oldPassword, newPassword);
    return {success: true, isAuthoriseError: false, isRequestFail: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {success: false, isAuthoriseError: e.isUnauthorizedError, isRequestFail: e._hasHttpStatus(500)}
  }
};

export const authLogin = async (data: { username: string, password: string }): Promise<AuthResponseInterface> => {
  const {password, username} = data;
  try {
    await tequilapiClient.authLogin(username, password);

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {success: false, isAuthoriseError: e.isUnauthorizedError, isRequestFail: e._hasHttpStatus(500)}
  }
};

export const acceptWithTermsAndConditions = async (): Promise<boolean> => {
  try {
    const config = await tequilapiClient.userConfig();
    const agrrementObject = {
      termsAgreed: {
        version: termsPackageJson.version,
        at: new Date().toISOString(),
      }
    };
    config.data.mysteriumWebUi = agrrementObject;
    await tequilapiClient.updateUserConfig(config);

    return true;
  } catch (e) {
    return false;
  }
};

export const setServicePrice = async (pricePerMinute: number | null, pricePerGb: number | null): Promise<boolean> => {
  try {
    if (pricePerMinute === 0.005 && pricePerGb === 0.005) {
      pricePerMinute = null;
      pricePerGb = null;
    }
    const config = await tequilapiClient.userConfig();
    if (config.data.openvpn) {
      config.data.openvpn['price-minute'] = pricePerMinute;
      config.data.openvpn['price-gb'] = pricePerGb;
    } else {
      config.data.openvpn = {
        'price-minute': pricePerMinute,
        'price-gb': pricePerGb
      }
    }
    if (config.data.wireguard) {
      config.data.wireguard['price-minute'] = pricePerMinute;
      config.data.wireguard['price-gb'] = pricePerGb;
    } else {
      config.data.wireguard = {
        'price-minute': pricePerMinute,
        'price-gb': pricePerGb
      }
    }
    await tequilapiClient.updateUserConfig(config);

    return true;
  } catch (e) {
    return false;
  }
};

export const getidentityList = () => {
  tequilapiClient.identityList().then((identities) => {
    console.log(identities);
  });
};

export const creteNewIdentity = async (): Promise<any> => {
  try {
    await tequilapiClient.identityCreate(DEFAULT_IDENTITY_PASSPHRASE);
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
  }
};

export const registerIdentity = async (id: string, beneficiary: string, stake: number): Promise<any> => {
  try {
    await tequilapiClient.identityRegister(id, {beneficiary: beneficiary, stake: stake});
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
  }
};

export const getCurrentIdentity = async (): Promise<IdentityRef> => {
  return await tequilapiClient.identityCurrent({passphrase: DEFAULT_IDENTITY_PASSPHRASE});
};
