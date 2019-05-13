import * as React from 'react'

const styles = require('./UserItem.module.scss')

const UserItem = () => (
  <tr>
    <td>
      <div className={styles.ipItem}>
        <div className="flag-icon" />
        <p>d617f200</p>
      </div>
    </td>
    <td>00:00:02:15</td>
    <td>9.11 GB</td>
    <td>139.12 MB</td>
  </tr>
)
export default UserItem
