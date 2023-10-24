/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Checkbox } from '../../../../Components/Inputs/Checkbox'
import React, { useState } from 'react'
import styled from 'styled-components'
import { TOSModal } from '../../Components/TOSModal/TOSModal'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`

const LinkButton = styled.div`
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2em;
  cursor: pointer;
`

type Props = {
  onAgree: (b: boolean) => void
  isAgreed: boolean
}

export const TOS = ({ onAgree, isAgreed }: Props) => {
  const [showTos, setShowTos] = useState(false)
  return (
    <Container>
      <Checkbox checked={isAgreed} onChange={onAgree} /> I agree to
      <LinkButton onClick={() => setShowTos(true)}>Terms and Conditions</LinkButton>
      <TOSModal show={showTos} hideAgree onClose={() => setShowTos(false)} onCloseLabel="Close" />
    </Container>
  )
}
