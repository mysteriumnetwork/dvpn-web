/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import storage from '../../../../commons/localStorageWrapper'
import errorInterceptors, { ErrorEntry, ErrorLog as EL } from '../../../../api/error.interceptors'
import styles from './ErrorLog.module.scss'
import dates from '../../../../commons/dates'
import Clipboard from 'clipboard'
import classNames from 'classnames'
import toasts from '../../../../commons/toasts'

export const ErrorLog = () => {
  const [errorLog, setErrorLog] = useState<EL>({ errors: [] })

  useEffect(() => {
    setErrorLog(storage.get<EL>(errorInterceptors.KEY_ERROR_LOG) || { errors: [] })
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
  useEffect(() => {
    const clipboard = new Clipboard('.copy-error-clip')
    return () => clipboard.destroy()
  }, [])

  const copyText = useMemo(
    () =>
      `${dates.date2human(new Date(createdAt).toISOString())}\nTag:\t\t${tag}\nCode:\t\t${code}\nMessage:\t${message}`,
    [code, message, tag, createdAt],
  )

  return (
    <div
      className={classNames(styles.row, 'copy-error-clip')}
      onClick={() => toasts.toastSuccess('Copied to Clipboard')}
      data-clipboard-text={copyText}
    >
      <div className={styles.time}>{dates.date2human(new Date(createdAt).toISOString())}</div>
      <div className={styles.code}>{code}</div>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}
