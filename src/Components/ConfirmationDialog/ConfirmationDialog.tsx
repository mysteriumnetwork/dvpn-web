/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Button } from '../Inputs/Button'
import zIndexes from '../../constants/z-indexes'

const PageOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  z-index: ${zIndexes.overlay};
  background: ${({ theme }) => theme.modal.bgOverlay};
`

const StyledConfirmationDialog = styled.div`
  position: fixed;
  z-index: ${zIndexes.overlay};

  width: 400px;

  left: 50%;
  top: 40%;
  transform: translate(-50%, 0);

  background: ${({ theme }) => theme.modal.bgColor};
  box-shadow: ${({ theme }) => theme.modal.boxShadow};
  border-radius: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  align-items: center;
`

const Title = styled.h2`
  margin-top: 16px;
  color: ${({ theme }) => theme.text.colorMain};
`

const Message = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.text.colorMain};
  text-align: center;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`
const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`

interface Props {
  title: string
  message: string
  show: boolean
  onConfirm?: () => void
  onConfirmLabel?: string
  onCancel?: () => void
  onCancelLabel?: string
  loading?: boolean
  disableBackdrop?: boolean
}

export const ConfirmationDialog = ({
  loading,
  show,
  onCancel = () => {},
  title,
  message,
  onConfirm,
  disableBackdrop,
  onConfirmLabel,
  onCancelLabel,
}: Props) => {
  if (!show) {
    return <></>
  }

  return (
    <>
      <PageOverlay onClick={() => !disableBackdrop && onCancel()} />
      <StyledConfirmationDialog>
        <Container>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <FlexGrow />
          <Controls>
            <Button
              disabled={loading}
              label={onCancelLabel ?? 'Cancel'}
              variant="outlined"
              rounded
              onClick={onCancel}
            />
            <Button loading={loading} label={onConfirmLabel ?? 'OK'} rounded onClick={onConfirm} />
          </Controls>
        </Container>
      </StyledConfirmationDialog>
    </>
  )
}
