/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  onSubmit?: () => void
}

export const Form = ({ children, onSubmit }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit && onSubmit()
      }}
    >
      {children}
    </form>
  )
}
