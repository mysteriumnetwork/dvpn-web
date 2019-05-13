import * as React from 'react'

const styles = require('./ConnectionFailedImgBlock.module.scss')

const ConnectionFailedImgBlock = () => (
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

export default ConnectionFailedImgBlock
