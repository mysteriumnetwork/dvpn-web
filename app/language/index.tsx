/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import { makeSelectLocale } from './selectors'

export let intl
export let locale

class LangProvider extends React.PureComponent<{
  locale?: string
  messages?: any
  children: any
}> {
  render() {
    const { locale: newLocale, messages, children } = this.props
    const { intl: newIntl } = new IntlProvider(
      {
        locale: newLocale,
        messages: messages[newLocale],
      },
      {},
    ).getChildContext()

    locale = newLocale
    intl = newIntl

    return (
      <IntlProvider locale={newLocale} key={newLocale} messages={messages[newLocale]}>
        {React.Children.only(children)}
      </IntlProvider>
    )
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  cLocale => ({
    locale: cLocale,
  }),
)

export default connect(mapStateToProps)(LangProvider)
