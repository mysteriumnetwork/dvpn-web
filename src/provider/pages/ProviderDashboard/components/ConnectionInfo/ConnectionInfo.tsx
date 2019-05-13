import * as React from 'react'
import trans from '../../../../../trans'

const styles = require('./ConnectionInfo.module.scss')

const ConnectionInfo = () => (
  <div className={styles.infoBar}>
    {/* Render dynamic values */}
    <table>
      <thead>
        <tr>
          <th>{trans('app.node.running.external.ip')}</th>
          <th>{trans('app.node.running.server.id')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={styles.ipItem}>
              <div className="flag-icon" />
              <p>172.93.13.176</p>
            </div>
          </td>
          <td>
            <span className={styles.infoID}>d617f200ef28a3a3ca2fc78a86d190e5c6f8eb0c</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)
export default ConnectionInfo
