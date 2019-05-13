import * as React from 'react'
import ConnectionItem from './ConnectionItem/ConnectionItem'

const styles = require('./TableBody.scss')

const TableBody = () => (
  <div className={styles.root}>
    <div className={styles.scrollView}>
      <table>
        <tbody>
          <ConnectionItem />
        </tbody>
      </table>
    </div>
  </div>
)

export default TableBody
