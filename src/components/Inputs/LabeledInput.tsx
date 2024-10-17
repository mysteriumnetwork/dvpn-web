/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useId } from 'react'
import { FormInputProps, FormInput } from './FormInput'

export type LabeledInputProps = FormInputProps & {
  readonly id?: string
  readonly label: string
  readonly required?: boolean
  readonly optional?: boolean
}

export const LabeledInput = ({ label, id, optional, required, ...rest }: LabeledInputProps) => {
  const randomId = useId()
  id = id ?? randomId

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <div className="flex w-full items-center justify-between">
          <label htmlFor={id} className="font-bold text-base text-blue-850">
            {label}
            {required && <span className="text-pink-525 align-text-bottom"> *</span>}
          </label>
          {optional && <span className="text-gray-550 text-sm">(optional)</span>}
        </div>
      )}
      <FormInput id={id} {...rest} />
    </div>
  )
}
