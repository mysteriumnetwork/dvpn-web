/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'

interface Props {
  id?: string
  children?: ReactNode
  onSubmit?: () => void
}

export const Form = ({ children, onSubmit, id }: Props) => {
  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit && onSubmit()
      }}
    >
      {children}
    </form>
  )
}
