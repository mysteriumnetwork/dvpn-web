/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-ignore
import { TermsExitNode } from '@mysteriumnetwork/terms'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import showdown from 'showdown'

import { tequila } from '../../../api/tequila'
import Button from '../../../Components/Buttons/Button'
import { StepLayout } from '../Components/StepLayout'
import styles from './Steps.module.scss'

const md = new showdown.Converter()

const TOS = ({ nextStep }: StepProps) => {
  const agree = async () => {
    await tequila.acceptWithTermsAndConditions()
    nextStep()
  }

  const termsHtml = md.makeHtml(TermsExitNode)

  return (
    <StepLayout title="Terms & Conditions" controls={<Button onClick={agree}>I accept</Button>} controlsCentered>
      <div className={styles.tos}>
        <>{ReactHtmlParser(termsHtml)}</>
      </div>
    </StepLayout>
  )
}

export default TOS
