import { getHttpApiUrl } from '../constants'
import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'
import axios from "axios";

const factory = new TequilapiClientFactory(getHttpApiUrl());
const httpAdapter = factory.buildAdapter(axios.create({baseURL: getHttpApiUrl(), withCredentials: true}));

export const tequilapiClient: TequilapiClient = factory.build(httpAdapter);

