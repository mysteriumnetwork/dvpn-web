/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import storage from '../../../../commons/localStorageWrapper'
import errors, { ErrorEntry, ErrorLog as EL } from '../../../../commons/errors'
import styles from './ErrorLog.module.scss'
import dates from '../../../../commons/dates'

export const ErrorLog = () => {
  const [errorLog, setErrorLog] = useState<EL>({ errors: [] })

  useEffect(() => {
    setErrorLog(storage.get<EL>(errors.KEY_ERROR_LOG) || { errors: [] })
  }, [])

  return (
    <div className={styles.content}>
      {errorLog.errors
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((error, index) => (
          <Row key={index} {...error} />
        ))}
    </div>
  )
}

const Row = ({ code, message, tag, createdAt }: ErrorEntry) => {
  return (
    <div className={styles.row}>
      <div className={styles.time}>{dates.date2human(new Date(createdAt).toISOString())}</div>
      <div className={styles.code}>{code}</div>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}
