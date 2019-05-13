import { intl, locale } from './language'

const messages = {
  en: {},
}

const trans = (id, values = undefined, defaultMessage = '') => {
  const val = JSON.stringify(values)

  if (!(messages[locale][id] && messages[locale][id][val])) {
    if (!messages[locale][id]) {
      messages[locale][id] = {}
    }
    messages[locale][id][val] = intl.formatMessage({ id, defaultMessage }, values)
  }

  return messages[locale][id][val]
}

export default trans
