import { getHttpApiUrl } from '../constants'
import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'

const factory = new TequilapiClientFactory(getHttpApiUrl());

const httpAdapter = factory.buildAdapter();

export const tequilapiClient: TequilapiClient = factory.build(httpAdapter);

