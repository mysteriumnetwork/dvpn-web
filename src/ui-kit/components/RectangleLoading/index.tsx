import React from 'react'

const styles = require('./RectangleLoading.module.scss')

type Props = {
  width: string | number,
  height: string | number
}

export default ({ width = '300', height = '20' }: Props) => (
  <div style={{ width, height }} className={styles.loadingBlock}/>
)
