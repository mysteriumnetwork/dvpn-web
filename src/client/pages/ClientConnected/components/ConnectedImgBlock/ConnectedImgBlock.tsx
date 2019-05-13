import * as React from 'react'

const styles = require('./ConnectedImgBlock.scss')

const ConnectedImgBlock = () => (
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

export default ConnectedImgBlock
