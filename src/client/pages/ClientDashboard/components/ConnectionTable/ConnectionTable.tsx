import * as React from 'react'

import TableHead from './components/TableHead/TableHead'
import TableBody from './components/TableBody/TableBody'

const styles = require('./ConnectionTable.module.scss')

const ConnectionTable = () => (
  <div className={styles.root}>
    <TableHead />
    <TableBody />
  </div>
)

export default ConnectionTable
