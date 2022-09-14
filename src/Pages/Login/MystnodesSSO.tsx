/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button } from '../../Components/Inputs/Button'
import { MystnodesIcon } from '../../Components/Icons/Icons'
import { tequila } from '../../api/tequila'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../commons/media'
import styled from 'styled-components'
import routes from '../../constants/routes'

const { initSSOAuth } = tequila

const Label = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

export const MystnodesSSO = () => {
  const isDesktop = useMediaQuery(media.isDesktopQuery)
  const onClick = async () => {
    const { link } = await initSSOAuth(`${new URL(window.location.href).origin}/#${routes.AUTH_SSO}`)
    window.location.href = link
  }
  return (
    <Button
      size="large"
      onClick={onClick}
      rounded
      label={
        <Label>
          <MystnodesIcon /> {isDesktop && 'Sign in with Mystnodes'}
        </Label>
      }
      variant="secondary"
      type="button"
    />
  )
}