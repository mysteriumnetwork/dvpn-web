/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Checkbox } from '../../../../components/Inputs/Checkbox'
import React, { useState } from 'react'
import { TOSModal } from '../../Components/TOSModal/TOSModal'
import complexActions from '../../../../redux/complex.actions'

type Props = {
  onAgree: (b: boolean) => void | Promise<void>
  isAgreed: boolean
}

export const TOS = ({ onAgree, isAgreed }: Props) => {
  const [showTos, setShowTos] = useState(false)
  return (
    <div className="flex items-center gap-1.5 text-light-secondary dark:text-dark-secondary text-sm">
      <Checkbox
        checked={isAgreed}
        onChange={async (c) => {
          onAgree(c)
          if (c) {
            await complexActions.recordTerms()
          }
        }}
      />{' '}
      I agree to
      <div
        className="font-semibold no-underline ml-2 cursor-pointer text-primary"
        role="button"
        onClick={() => setShowTos(true)}
      >
        Terms and Conditions
      </div>
      <TOSModal show={showTos} hideAgree onClose={() => setShowTos(false)} onCloseLabel="Close" />
    </div>
  )
}
