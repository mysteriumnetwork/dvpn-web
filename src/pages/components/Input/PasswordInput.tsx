/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LabeledInput, LabeledInputProps } from '../../../components/Inputs/LabeledInput'

export const PasswordInput = (props: Omit<LabeledInputProps, 'controls' | 'onIconClick' | 'type'>) => {
  const [show, setShow] = useState(false)

  const passwordIcon = show ? (
    <FontAwesomeIcon className="text-gray-250" icon={faEye} />
  ) : (
    <FontAwesomeIcon className="text-gray-250" icon={faEyeSlash} />
  )

  return (
    <LabeledInput
      {...props}
      type={show ? 'text' : 'password'}
      controls={passwordIcon}
      onIconClick={() => setShow(!show)}
    />
  )
}
