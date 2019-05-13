import * as React from 'react'
import InfoBlock from './components/InfoBlock/InfoBlock'
import ConnectionBlock from './components/ConnectionBlock/ConnectionBlock'

const styles = require('./BottomBar.module.scss')

const BottomBar = () => (
  <div className={styles.root}>
    <InfoBlock />
    <ConnectionBlock />
  </div>
)
export default BottomBar
