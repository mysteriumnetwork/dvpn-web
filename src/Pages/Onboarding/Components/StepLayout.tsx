/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './StepLayout.module.scss'
import { CircularSpinner } from '../../../Components/CircularSpinner/CircularSpinner'

interface Props {
  title: ReactNode
  description?: string
  children?: ReactNode
  controls?: ReactNode
  controlsCentered?: boolean
  isLoading?: boolean
  fixed?: boolean
}

export const StepLayout = ({ title, children, description, controls, controlsCentered, isLoading, fixed }: Props) => (
  <div className={classNames(styles.step, fixed ? styles.stepFixed : styles.stepCentered)}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
    {isLoading ? (
      <CircularSpinner className={styles.loading} />
    ) : (
      <>
        <div className={styles.content}>{children}</div>
        <div id="separator" style={{ marginTop: '40px' }} />
        <div className={classNames(styles.controls, controlsCentered && styles.controlsCentered)}>{controls}</div>
      </>
    )}
  </div>
)
