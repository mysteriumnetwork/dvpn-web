import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'

const factory = new TequilapiClientFactory(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`);
export const tequilapiClient: TequilapiClient = factory.build();