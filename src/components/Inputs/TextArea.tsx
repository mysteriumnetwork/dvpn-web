/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useId } from 'react'

type Props = {
  readonly label?: string
  readonly rows?: number
  readonly required?: boolean
  readonly value?: string
  readonly placeholder?: string
  readonly onChange?: (v: string) => void
  readonly register?: object
  readonly isError?: boolean
  readonly errorMessage?: string
}

export const TextArea = ({
  label,
  rows = 8,
  required = false,
  value,
  placeholder,
  onChange,
  register = {},
  isError,
  errorMessage,
}: Props) => {
  const id = useId()
  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="w-full flex justify-between items-center">
        <label htmlFor={id} className="text-base text-blue-850 font-semibold">
          {label}
          {required && <span className="text-pink-525 align-text-bottom"> *</span>}
        </label>
        {!required && <div className="text-gray-550 text-sm">(optional)</div>}
      </div>
      <textarea
        className="w-full rounded-xl border border-gray-125 px-4 py-2 resize-none"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const { value } = e.target
          onChange && onChange(value)
        }}
        rows={rows}
        {...register}
      />
      {isError && errorMessage && <div className="block text-red text-sm mt-1 whitespace-pre-line">{errorMessage}</div>}
    </div>
  )
}

export default TextArea
