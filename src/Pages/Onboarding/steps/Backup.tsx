/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '../../../assets/styles/pages/onboarding/steps/backup.scss'
import Button from '../../../Components/Buttons/Button'

const Backup = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
  return (
    <div className="step-block backup">
      <h1 className="step-block--heading">Backup your keys</h1>
      <p className="step-block--heading-paragraph">
        To make sure you don’t lose your earnings, you should store your identity’s private key file somewhere safe.
        Read more about backup
      </p>
      <div className="step-block-content">
        <Button onClick={callbacks.nextStep}>Skip</Button>
        {/*<div className="btn btn-filled download">*/}
        {/*    <span className="btn-text">Download private key</span>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default Backup
