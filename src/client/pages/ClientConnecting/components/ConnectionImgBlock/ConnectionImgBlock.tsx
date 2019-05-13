import * as React from 'react'

const styles = require('./ConnectionImgBlock.module.scss')

const ConnectionImgBlock = () => (
  <div className={styles.root}>
    <div className={styles.back} />
    {/* render flag icon */}
    <div className={styles.user}>
      <div className="flag-icon" />
    </div>
    <div className={styles.node}>
      <div className="flag-icon" />
    </div>
  </div>
)

export default ConnectionImgBlock
