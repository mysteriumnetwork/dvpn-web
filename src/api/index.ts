import { TequilaApi } from './tequila-api'
import { getHttpApiUrl } from '../constants'
import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'

const factory = new TequilapiClientFactory(getHttpApiUrl())

export const tequilapiClient: TequilapiClient = factory.build(factory.buildAdapter())

//TODO: move to mysterium-vpn-js
export const tequilaApi = new TequilaApi(factory.buildAdapter())
