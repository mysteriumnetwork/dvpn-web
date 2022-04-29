/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import Button from '../../../Components/Buttons/Button'
import { StepLayout } from '../Components/StepLayout'

const Greeting = ({ nextStep }: StepProps) => (
  <StepLayout
    title="Welcome node runner!"
    description="Lets get you up and running."
    controls={<Button onClick={nextStep}>Start node setup</Button>}
    controlsCentered
  />
)
export default Greeting
