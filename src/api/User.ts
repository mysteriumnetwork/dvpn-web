import { tequilapiClient } from './TequilApiClient'
import * as termsPackageJson from "@mysteriumnetwork/terms/package.json"

export const authChangePassword = async (data: { username: string, oldPassword: string, newPassword: string }): Promise<any> => {
  const { newPassword, oldPassword, username } = data
  try {
    await tequilapiClient.authChangePassword(username, oldPassword, newPassword)
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
  }
};

export const authLogin = async (data: { username: string, password: string }): Promise<any> => {
  const { password, username } = data;
  try {
    await tequilapiClient.authLogin(username, password);
  } catch (e) {
    console.log(e.isUnauthorizedError ? 'Authorization failed!' : e.message);
  }
};

export const  acceptWithTermsAndConditions = async (): Promise<void> => {
  try {
    const config = await tequilapiClient.userConfig();
    const configData = config.data;
    const agrrementObject =   {
      termsAgreed:{
        version: termsPackageJson.version,
        at: new Date().toISOString(),
      }
    };
    configData.mysteriumWebUi = agrrementObject;
    const data = { configData };
    await tequilapiClient.updateUserConfig({ data });
  } catch (e) {
    console.log(e.message);
  }
};


export  const getidentityList = () =>{
  tequilapiClient.identityList().then((identities) => {
    console.log(identities);
  });
};
