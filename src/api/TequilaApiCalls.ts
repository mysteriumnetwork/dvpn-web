import {DEFAULT_IDENTITY_PASSPHRASE} from '../Services/constants'
import {tequilapiClient} from './TequilApiClient'
import * as termsPackageJson from "@mysteriumnetwork/terms/package.json"
import {IdentityRegistrationStatus} from "mysterium-vpn-js/lib/identity/identity";
import {
  BasicResponseInterface,
  CreateNewIdentityResponseInterface,
  IdentityResponseInterface,
  IdentityListResponseInterface,
  UserConfigResponseInterface,
  TransactionsFeesResponseInterface,
  CurrentIdentityResponseInterface
} from './TequilApiResponseInterfaces'

export const authChangePassword = async (data: { username: string, oldPassword: string, newPassword: string }):
  Promise<BasicResponseInterface> => {
  const {newPassword, oldPassword, username} = data;
  try {
    await tequilapiClient.authChangePassword(username, oldPassword, newPassword);
    return {success: true, isAuthoriseError: false, isRequestFail: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const authLogin = async (data: { username: string, password: string }): Promise<BasicResponseInterface> => {
  const {password, username} = data;
  try {
    await tequilapiClient.authLogin(username, password);

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const acceptWithTermsAndConditions = async (): Promise<BasicResponseInterface> => {
  try {
    const config = await tequilapiClient.userConfig();
    const agreementObject = {
      termsAgreed: {
        version: termsPackageJson.version,
        at: new Date().toISOString(),
      }
    };
    config.data.mysteriumWebUi = agreementObject;
    await tequilapiClient.updateUserConfig(config);

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const setServicePrice = async (pricePerMinute: number | null, pricePerGb: number | null):
  Promise<BasicResponseInterface> => {
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

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {

    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const creteNewIdentity = async (): Promise<CreateNewIdentityResponseInterface> => {
  try {
    return {
      success: true,
      isRequestFail: false,
      isAuthoriseError: false,
      identityRef: await tequilapiClient.identityCreate(DEFAULT_IDENTITY_PASSPHRASE)
    }
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      identityRef: {id: ''}
    }
  }
};

export const registerIdentity = async (id: string, beneficiary: string, stake: number, fee: number): Promise<BasicResponseInterface> => {
  try {
    await tequilapiClient.identityRegister(id, {beneficiary: beneficiary, stake: stake, fee: fee});

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const unlockIdentity = async (id: string): Promise<BasicResponseInterface> => {
  try {
    await tequilapiClient.identityUnlock(id, DEFAULT_IDENTITY_PASSPHRASE);

    return {success: true, isRequestFail: false, isAuthoriseError: false}
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const getIdentityList = async (): Promise<IdentityListResponseInterface> => {
  try {
    return {
      success: true,
      isRequestFail: false,
      isAuthoriseError: false,
      identityRef: await tequilapiClient.identityList()
    }
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      identityRef: [{id: ""}],
      errorMessage: e.message
    }
  }
};

export const getCurrentIdentity = async (): Promise<CurrentIdentityResponseInterface> => {
  try {
    return {
      success: true,
      isAuthoriseError: false,
      isRequestFail: false,
      identityRef: await tequilapiClient.identityCurrent({passphrase: DEFAULT_IDENTITY_PASSPHRASE})
    };

  } catch (e) {

    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      identityRef: {id: ""},
      errorMessage: e.message
    }
  }
};

export const claimMMNNode = async (apiKey: string): Promise<BasicResponseInterface> => {
  try {
    await tequilapiClient.setMMNApiKey(apiKey);
    return {success: true, isAuthoriseError: false, isRequestFail: false};

  } catch (e) {

    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message
    }
  }
};

export const getTransactionsFees = async (): Promise<TransactionsFeesResponseInterface> => {
  try {
    return {
      success: true,
      isAuthoriseError: false,
      isRequestFail: false,
      transactorFeesResponse: await tequilapiClient.transactorFees()
    };

  } catch (e) {

    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      transactorFeesResponse: {registration: 0, settlement: 0},
      errorMessage: e.message
    }
  }
};

export const getUserConfig = async (): Promise<UserConfigResponseInterface> => {
  try {
    return {
      success: true,
      isAuthoriseError: false,
      isRequestFail: false,
      userConfig: await tequilapiClient.userConfig()
    };

  } catch (e) {

    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      userConfig: {data: ""},
      errorMessage: e.message
    }
  }
};


export const getIdentity = async (id: string): Promise<IdentityResponseInterface> => {
  try {
    return {
      success: true,
      isAuthoriseError: false,
      isRequestFail: false,
      identity: await tequilapiClient.identity(id)
    };

  } catch (e) {
    console.log(e.message)
    return {
      success: false,
      isAuthoriseError: e.isUnauthorizedError,
      isRequestFail: e._hasHttpStatus(500),
      errorMessage: e.message,
      identity: {
        id: "asd",
        earnings: 0,
        balance: 0,
        channelAddress: "",
        earningsTotal: 0,
        registrationStatus: IdentityRegistrationStatus.InProgress,
      }
    }
  }
};



