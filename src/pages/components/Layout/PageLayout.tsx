/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { FullPageSpinner } from '../../Authenticated/Components/Spinner/FullPageSpinner'
import Menu from '../Menu/Menu'
import LogoWithTitle from '../../../components/Logo/LogoWithTitle'
import Container from '../../../components/Containers/Container'
import ContentContainer from '../../../components/Containers/ContentContainer'

const Header = React.lazy(() => import('../Header/Header'))
const Footer = React.lazy(() => import('../Footer/Footer'))
const Sidebar = React.lazy(() => import('../Sidebar/Sidebar'))

type Props = PropsWithChildren<{
  readonly hideHeader?: boolean
  readonly hideFooter?: boolean
  readonly hideSidebar?: boolean
  readonly showLogo?: boolean
  readonly className?: string
  readonly wideContent?: boolean
  readonly isLoading?: boolean
}>

export const PageLayout = ({
  children,
  hideHeader,
  hideFooter,
  hideSidebar,
  showLogo,
  className,
  isLoading,
  wideContent,
}: Props) => {
  return (
    <div className={twMerge('w-full min-h-screen flex flex-col', className)}>
      {!hideHeader && <Header />}
      {showLogo && <LogoWithTitle className="px-10 py-4" />}
      <Container
        className={twMerge('bg-gradient-to-br from-white-75 to-pink-125 grow', !hideHeader && 'pt-[76px]')}
        noSidePadding
      >
        {isLoading && (
          <div className="fixed z-[10000] bg-white/40 backdrop-blur inset-0 flex justify-center items-center">
            <FullPageSpinner />
          </div>
        )}
        <div className="flex items-start">
          {!hideSidebar && (
            <Sidebar className="hidden md:block">
              <Menu className="gap-5 pt-32 pb-16" />
            </Sidebar>
          )}
          <ContentContainer wide={wideContent}>{children}</ContentContainer>
        </div>
      </Container>
      {!hideFooter && <Footer />}
    </div>
  )
}
