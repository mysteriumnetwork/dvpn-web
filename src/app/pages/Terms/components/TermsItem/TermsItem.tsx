import * as React from 'react'
import trans from '../../../../../trans'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'

const styles = require('./TermsItem.module.scss')

type Props = {
  title: string
  body: string
  last: string
  tall?: boolean
}

class TermsItem extends React.PureComponent<Props> {
  state = {
    more: false
  }

  handleMore = () => this.setState({ more: true })

  handleLess = () => this.setState({ more: false })

  render() {
    const { title, body, tall, last } = this.props

    return (
      <div className={styles.termsItem}>
        <h3>{title}</h3>
        <div className={styles.termsItemText}>
          <ReactMarkdown escapeHtml={false} source={body}
                         className={classNames(styles.termsItemMd, {
                           [styles.tall]: tall,
                           [styles.active]: this.state.more
                         })}/>
          {this.state.more ? (
            <button onClick={this.handleLess}>{'<'} {trans('app.onboarding.less.btn')}</button>
          ) : (
            <button onClick={this.handleMore}>{trans('app.onboarding.more.btn')} {'>'}</button>
          )}
        </div>
        <p className={styles.date}>Last version {last}</p>
      </div>
    )
  }
}

export default TermsItem
