export const HTTP_NOT_FOUND = 404
export const NAT_FIX_URL = process.env.REACT_APP_FIX_NAT_URL
export const getHttpApiUrl = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`

export const NODE_TYPE = {
  RESIDENTIAL: 'residential',
  DATA_CENTER: 'data_center'
}

export const APP_EVENTS = {
  ABOUT_DIALOG_SHOW: 'ABOUT_DIALOG_SHOW'
}
