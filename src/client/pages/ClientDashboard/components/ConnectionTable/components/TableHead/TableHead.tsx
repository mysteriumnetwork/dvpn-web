import * as React from 'react'
import trans from '../../../../../../../trans'

const styles = require('./TableHead.scss')

const TableHead = () => (
  <div className={styles.root}>
    <table>
      <thead>
        <tr>
          <th>{trans('app.client.dashboard.server')}</th>
          <th>{trans('app.client.dashboard.connection.type')}</th>
          <th>Sort: Quality</th>
        </tr>
      </thead>
    </table>
  </div>
)

export default TableHead
