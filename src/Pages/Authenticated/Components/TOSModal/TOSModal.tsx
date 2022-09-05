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
import { devices } from '../../../../theme/themes'
import complexActions from '../../../../redux/complex.actions'
import zIndexes from '../../../../constants/z-indexes'

const Note = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.common.colorKey};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  &:nth-of-type(1) {
    margin-top: 20px;
  }
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeNormal};
    text-align: center;
    display: inline-block;
    padding: 0 15px;
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
  display: inline;
  color: ${({ theme }) => theme.common.colorKey};
  margin-left: 0.25em;
`
interface Props {
  show: boolean
  hideAgree?: boolean
  onClose?: () => void
  onCloseLabel?: string
}
const md = new showdown.Converter()

export const TOSModal = ({ show = false, onClose, hideAgree, onCloseLabel }: Props) => {
  const termsHtml = md.makeHtml(TermsExitNode)
  const agree = async () => {
    await complexActions.acceptWithTermsAndConditions()
  }
  return (
    <Modal
      disableBackdrop
      disableX
      show={show}
      zIndex={zIndexes.onboardingModal}
      title="Terms and Conditions Update"
      icon={<InfoIcon />}
    >
      <Content>
        <Note>We have updated our Terms and Conditions. Please click agree to access NODE UI</Note>
        <Note>
          You can always find our terms and conditions on
          <Link href="https://mystnodes.com/terms" target="_blank">
            mystnodes.com/terms
          </Link>
        </Note>
        <Container>{ReactHtmlParser(termsHtml)}</Container>
        <Footer>
          {onClose && <Button label={onCloseLabel || 'Cancel'} rounded variant={'outlined'} onClick={onClose} />}
          {!hideAgree && (
            <Button
              label="Agree"
              rounded
              onClick={() => {
                agree()
              }}
            />
          )}
        </Footer>
      </Content>
    </Modal>
  )
}
