/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ReactHtmlParser from 'react-html-parser'
import showdown from 'showdown'
// @ts-ignore
import { TermsExitNode } from '@mysteriumnetwork/terms'

import { tequila } from '../../../api/wrapped-calls'
import Button from '../../../Components/Buttons/Button'
import styles from './Steps.module.scss'
import classNames from 'classnames'

const md = new showdown.Converter()

const TOS = ({ nextStep }: StepProps): JSX.Element => {
  const agree = async () => {
    await tequila.acceptWithTermsAndConditions()
    nextStep()
  }

  const termsHtml = md.makeHtml(TermsExitNode)
  return (
    <div className={styles.step}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <div className={styles.content}>
        <div className={styles.tos}>{ReactHtmlParser(termsHtml)}</div>
        <div id="separator" style={{ marginTop: '100px' }} />
        <div className={classNames(styles.controls, styles.controlsCentered)}>
          <Button onClick={agree}>I accept</Button>
        </div>
      </div>
    </div>
  )
}

export default TOS
