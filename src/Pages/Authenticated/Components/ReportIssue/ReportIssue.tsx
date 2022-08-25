/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportIssueModal } from './ReportIssueModal'
import styled from 'styled-components'
import { useState } from 'react'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { IconButton } from '../../../../Components/Inputs/IconButton'

interface TransitionProps {
  $transition: boolean
}
const Title = styled.div``
const Container = styled.div<TransitionProps>`
  display: ${({ $transition }) => ($transition ? 'flex' : 'none')};
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $transition }) => ($transition ? '40px' : 0)};
  padding-right: ${({ $transition }) => ($transition ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;
  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    opacity: ${({ $transition }) => ($transition ? 1 : 0)};
    max-width: ${({ $transition }) => ($transition ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
`
interface Props {
  title: string
  transition: boolean
}

export const ReportIssue = ({ title, transition }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <Container $transition={transition}>
      <IconButton onClick={() => setShowModal(true)} icon={<BugButtonIcon />} />
      <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
      <Title>{title}</Title>
    </Container>
  )
}
