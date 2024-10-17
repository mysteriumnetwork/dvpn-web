/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

type Props = {
  readonly id?: string
  readonly checked?: boolean
  readonly onChange?: (checked: boolean) => void
  readonly disabled?: boolean
}

export const Toggle = ({ id, checked, onChange = () => {}, disabled }: Props) => {
  const mappedId = `${id || Math.random().toString()}toggleCheckbox`
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        id={mappedId}
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          const { checked } = e.target
          onChange(checked)
        }}
      />
      <div
        className="w-[55px] h-7 bg-white-25 rounded-full
        peer-checked:after:translate-x-full peer-checked:after:shadow-md
        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-0.5 after:start-1 after:bg-white
        after:shadow-md after:rounded-full after:size-6
        after:transition-all peer-checked:bg-pink-525"
      />
    </label>
  )
}

export default Toggle
