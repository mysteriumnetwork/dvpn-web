/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import Button from '../../../Components/Buttons/Button'

const Welcome = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
  return (
    <div className="step">
      <h1 className="step__title">Welcome node runner!</h1>
      <p className="step__description">Lets get you up and running. </p>
      <div className="step__content m-t-100">
        <div className="step__content-buttons">
          <Button onClick={callbacks.nextStep}>Start node setup</Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
