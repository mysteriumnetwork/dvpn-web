import * as React from 'react'
import ReactMarkdown from 'react-markdown'

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

  // handleMore = () => this.setState({ more: true })
  //
  // handleLess = () => this.setState({ more: false })

  render() {
    const { title, body, last } = this.props

    return (
      <div className={styles.termsItem}>
        <h3>{title}</h3>
        <div className={styles.termsItemText}>
          <ReactMarkdown escapeHtml={false} source={body} className={styles.termsItemMd}/>
        </div>
        <p className={styles.date}>Last version {last}</p>
      </div>
    )
  }
}

export default TermsItem
