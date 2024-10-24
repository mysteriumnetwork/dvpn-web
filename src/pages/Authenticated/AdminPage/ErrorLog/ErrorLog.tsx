/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import storage from '../../../../commons/localStorageWrapper'
import errorInterceptors, { ErrorEntry, ErrorLog as EL } from '../../../../api/error.interceptors'
import dates from '../../../../commons/dates'
import Clipboard from 'clipboard'
import toasts from '../../../../commons/toasts'
import styled from 'styled-components'
import { PanelCard } from '../PanelCard'
import { nanoid } from 'nanoid'

const Container = styled.div`
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 5px;
`
const Card = styled.div`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.adminPanel.bgCardHover};
  }
  background-color: ${({ theme }) => theme.adminPanel.bgCard};
  border-radius: 20px;
  padding: 20px;
  width: 400px;
  display: flex;
`
const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
  justify-content: space-between;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
`
const Name = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
`
const Value = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
`
const Error = ({ code, message, tag, createdAt }: ErrorEntry) => {
  const uid = useMemo(() => nanoid(), [])
  useEffect(() => {
    const clipboard = new Clipboard(`.clipboard-${uid}`)
    return () => clipboard.destroy()
  }, [])

  const copyText = useMemo(
    () =>
      `${dates.date2human(new Date(createdAt).toISOString())}\nTag:\t\t${tag}\nCode:\t\t${code}\nMessage:\t${message}`,
    [code, message, tag, createdAt],
  )

  return (
    <Card className={uid} onClick={() => toasts.toastSuccess('Copied to Clipboard')} data-clipboard-text={copyText}>
      <Column>
        <Row>
          <Column>
            <Name>Time:</Name>
            <Value>{dates.date2human(new Date(createdAt).toISOString())}</Value>
          </Column>
          <Column>
            <Name>Error code:</Name>
            <Value>{code}</Value>
          </Column>
        </Row>
        <Row>
          <Column>
            <Name>Error tag:</Name>
            <Value>{tag}</Value>
          </Column>
          <Column>
            <Name>Error message:</Name>
            <Value>{message}</Value>
          </Column>
        </Row>
      </Column>
    </Card>
  )
}

export const ErrorLog = () => {
  const [errorLog, setErrorLog] = useState<EL>({ errors: [] })

  useEffect(() => {
    setErrorLog(storage.get<EL>(errorInterceptors.KEY_ERROR_LOG) || { errors: [] })
  }, [])

  return (
    <PanelCard title="Error logs">
      <Container>
        {errorLog.errors
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((error, index) => (
            <Error key={index} {...error} />
          ))}
      </Container>
    </PanelCard>
  )
}
