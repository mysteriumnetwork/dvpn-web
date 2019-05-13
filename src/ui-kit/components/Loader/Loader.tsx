import * as React from 'react'

const styles = require('./Loader.module.scss')

const Loader = () => (
  <div className={styles.root}>
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default Loader
