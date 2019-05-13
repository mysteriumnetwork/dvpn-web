/*
 *
 * LanguageProvider reducer
 *
 */

export const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE'
export const DEFAULT_LOCALE = 'en'

const initialState: any = {
  locale: DEFAULT_LOCALE,
}

export default function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      }
    default:
      return state
  }
}

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  }
}
