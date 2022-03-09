/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Layout } from '../Layout'
import styles from './Admin.module.scss'
import { VersionManagement } from './VersionManagement/VersionManagement'

export const AdminPage = () => {
  return (
    <Layout
      title="Admin"
      isLoading={false}
      main={
        <div className={styles.page}>
          <div className={styles.versionManagement}>
            <VersionManagement />
          </div>
        </div>
      }
    />
  )
}
