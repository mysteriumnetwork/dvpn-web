/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  readonly href: string
}

export const FooterLink = ({ href, children }: PropsWithChildren<Props>) => (
  <Link to={href} target="_blank" className="text-gray-125 font-normal text-sm">
    {children}
  </Link>
)
