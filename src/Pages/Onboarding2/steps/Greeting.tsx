/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Steps.module.scss'
import Button from '../../../Components/Buttons/Button'
import { NavLink } from 'react-router-dom'

const Greeting = ({ nextStep }: StepProps) => {
  return (
    <div className={styles.step}>
      <h1 className={styles.title}>Welcome node runner!</h1>
      <p className={styles.description}>Lets get you up and running. </p>
      <div id="separator" style={{ marginTop: '100px' }} />
      <div className={styles.content}>
        <div className={styles.controls}>
          <Button onClick={nextStep}>Start node setup</Button>
        </div>
      </div>
    </div>
  )
}

export default Greeting
