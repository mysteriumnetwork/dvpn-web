/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { HTMLInputTypeAttribute, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import ErrorMessage from '../Typography/ErrorMessage'

export type FormInputProps = {
  readonly id?: string
  readonly type?: HTMLInputTypeAttribute
  readonly step?: number
  readonly placeholder?: string
  readonly value?: string
  readonly onChange?: (value: string) => void
  readonly onFocus?: () => void
  readonly maxLength?: number
  readonly fluid?: boolean
  readonly autoFocus?: boolean
  readonly disabled?: boolean
  readonly isError?: boolean
  readonly errorMessage?: string
  readonly errorMessagePadding?: boolean
  readonly className?: string
  readonly register?: UseFormRegisterReturn
  readonly controls?: React.ReactNode
  readonly hideControlsSeparator?: boolean
  readonly onIconClick?: () => void
}

export const FormInput = ({
  id,
  type = 'text',
  step,
  placeholder,
  value,
  onChange,
  maxLength,
  autoFocus,
  disabled,
  fluid,
  isError,
  errorMessage,
  errorMessagePadding = true,
  className,
  register,
  onFocus,
  controls,
  onIconClick,
  hideControlsSeparator,
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={twMerge('w-full', errorMessagePadding && 'mb-6')}>
      <div className={twMerge('flex items-center', 'text-gray-25', !fluid && 'w-fit')}>
        <input
          id={id}
          type={type}
          step={step}
          placeholder={placeholder}
          value={value}
          onFocus={() => {
            setIsFocused(true)
            onFocus && onFocus()
          }}
          maxLength={maxLength}
          autoFocus={autoFocus}
          disabled={disabled}
          className={twMerge(
            'box-border text-base text-gray-750 h-[46px] border border-solid border-gray-125 rounded-lg px-2.5 md:px-5 py-2.5',
            'placeholder:text-gray-250 placeholder:font-normal caret-pink-525 outline-none',
            'focus:border-pink-525',
            controls && 'pr-0',
            !fluid && 'w-fit',
            fluid && 'w-full',
            disabled && 'bg-white placeholder:text-gray-250 text-gray-250 cursor-not-allowed',
            isError && 'border-red placeholder:text-red',
            controls && 'rounded-r-none border-r-0 ',
            hideControlsSeparator && 'border-r-0',
            className,
          )}
          {...register}
          onBlur={(e) => {
            register?.onBlur(e)
            setIsFocused(false)
          }}
          onChange={(e) => {
            const { value } = e.target
            if (onChange) {
              onChange(value)
            }
            register?.onChange(e)
          }}
        />
        {controls && (
          <div
            onClick={onIconClick}
            className={twMerge(
              'flex flex-col justify-center items-center w-[46px] h-[46px] px-4 bg-white',
              'border border-gray-125 border-solid border-l-0 rounded-r-lg',
              isError && 'border-red',
              !disabled ? 'cursor-pointer' : 'cursor-not-allowed text-gray-250',
              onIconClick ? 'cursor-pointer' : 'cursor-default',
              isFocused && 'border-pink-525',
            )}
          >
            {controls}
          </div>
        )}
      </div>
      {isError && errorMessage && <ErrorMessage className="absolute block mt-1" value={errorMessage} />}
    </div>
  )
}

export default FormInput
