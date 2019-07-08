import { getHttpApiUrl } from '../constants'
import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'

const factory = new TequilapiClientFactory(getHttpApiUrl())

export const tequilapiClient: TequilapiClient = factory.build(factory.buildAdapter())
