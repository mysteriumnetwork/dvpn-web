import {DEFAULT_IDENTITY_PASSPHRASE} from '../constants'
import {tequilapiClient} from './TequilApiClient'
import * as termsPackageJson from "@mysteriumnetwork/terms/package.json"

export const authChangePassword = async (data: { username: string, oldPassword: string, newPassword: string }): Promise<any> => {
  const {newPassword, oldPassword, username} = data;
  try {
    await tequilapiClient.authChangePassword(username, oldPassword, newPassword)
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
  }
};

export const authLogin = async (data: { username: string, password: string }): Promise<any> => {
  const {password, username} = data;
  try {
    await tequilapiClient.authLogin(username, password);
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
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
    if(config.data.openvpn){
      config.data.openvpn['price-minute'] = pricePerMinute;
      config.data.openvpn['price-gb'] = pricePerGb;
    } else {
      config.data.openvpn = {
        'price-minute': pricePerMinute,
        'price-gb': pricePerGb
      }
    }
    if(config.data.wireguard){
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
