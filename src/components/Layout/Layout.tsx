/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import LogoWithTitle from '../Logo/LogoWithTitle'

type Props = PropsWithChildren<{
  readonly helmet?: ReactNode
  readonly header?: ReactNode
  readonly footer?: ReactNode
  readonly sidebar?: ReactNode
  readonly hideHeader?: boolean
  readonly hideFooter?: boolean
  readonly hideSidebar?: boolean
  readonly showLogo?: boolean
  readonly className?: string
}>

export const Layout = ({
  children,
  header,
  footer,
  sidebar,
  helmet,
  hideHeader,
  hideFooter,
  hideSidebar,
  showLogo,
  className,
}: Props) => {
  return (
    <div className={twMerge('w-full min-h-screen', className)}>
      {helmet}
      {!hideHeader && header}
      {showLogo && <LogoWithTitle className="px-10 py-4" />}
      <div className="flex min-h-full">
        {!hideSidebar && sidebar}
        <main className="w-full">{children}</main>
      </div>
      {!hideFooter && footer}
    </div>
  )
}
