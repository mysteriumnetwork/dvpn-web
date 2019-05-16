import React from 'react'

const styles = require('./RectangleLoading.module.scss')

export default ({ width = '300', height = '20' }) => (
  <div style={{ width, height }} className={styles.loadingBlock}/>
)
