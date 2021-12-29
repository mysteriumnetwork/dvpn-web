/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMediaQuery } from 'react-responsive'
import { MediaQueryAllQueryable } from 'react-responsive/src/types'

const isMobileQuery: MediaQueryAllQueryable = { maxWidth: 768 }
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery(isMobileQuery)
  return isMobile ? children : null
}

const isDesktopQuery: MediaQueryAllQueryable = { minWidth: 767 }
const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery(isDesktopQuery)
  return isDesktop ? children : null
}

export const media = {
  isDesktopQuery,
  isMobileQuery,
}

export const Media = {
  Mobile,
  Desktop,
}
