/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-ignore
import { TermsExitNode } from '@mysteriumnetwork/terms'
import { Modal } from '../../../../Components/Modals/Modal'
import styled from 'styled-components'
import showdown from 'showdown'
import { ReactComponent as InfoIcon } from '../../../../assets/images/info-big.svg'
import ReactHtmlParser from 'react-html-parser'
import { Button } from '../../../../Components/Inputs/Button'
import { tequila } from '../../../../api/tequila'

const HeaderNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.common.colorKey};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  &:nth-of-type(1) {
    margin-top: 20px;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`
const Container = styled.div`
  width: 90%;
  overflow: auto;
  max-height: 200px;
  max-width: 90%;
  font-weight: 500;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.TOSModal.textColor};
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-start;
`
const Link = styled.a`
  color: ${({ theme }) => theme.common.colorKey};
  margin-left: 0.25em;
`
interface Props {
  show: boolean
  onClose?: () => void
}
const md = new showdown.Converter()

export const TOSModal = ({ show = false, onClose }: Props) => {
  const termsHtml = md.makeHtml(TermsExitNode)
  const agree = async () => {
    await tequila.acceptWithTermsAndConditions()
  }
  return (
    <Modal disableBackdrop show={show} title="Terms and Conditions Update" onClickX={onClose} icon={<InfoIcon />}>
      <Content>
        <HeaderNote>We have updated our Terms and Conditions. Please click agree to access NODE UI</HeaderNote>
        <HeaderNote>
          You can always find our terms and conditions on
          <Link href="https://mystnodes.com/terms" target="_blank">
            mystnodes.com/terms
          </Link>
        </HeaderNote>
        <Container>{ReactHtmlParser(termsHtml)}</Container>
        <Footer>
          <Button label="Cancel" rounded variant={'outlined'} />
          <Button
            label="Agree"
            rounded
            onClick={() => {
              agree()
            }}
          />
        </Footer>
      </Content>
    </Modal>
  )
}
