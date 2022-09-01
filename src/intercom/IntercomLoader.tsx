/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useAppSelector } from '../commons/hooks'
import { selectors } from '../redux/selectors'
import { useEffect } from 'react'
import { initIntercom, updateIntercom } from './intercom'
import { useMediaQuery } from 'react-responsive'
import { media } from '../commons/media'

export const IntercomLoader = () => {
  const { authenticated: loggedIn } = useAppSelector(selectors.auth)
  useEffect(() => {
    if (!loggedIn) {
      return
    }

    initIntercom()
  }, [loggedIn])

  const isMobile = useMediaQuery(media.isMobileQuery)
  // this is just to handle mobile view on desktop
  useEffect(() => {
    updateIntercom(isMobile ? 'mobile' : 'desktop')
  }, [isMobile, loggedIn])

  return <></>
}
