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

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 600px;
  max-height: 90vh;
  overflow-x: hidden;
  overflow-y: scroll;
`

export const ErrorLog = () => {
  const [errorLog, setErrorLog] = useState<EL>({ errors: [] })

  useEffect(() => {
    setErrorLog(storage.get<EL>(errorInterceptors.KEY_ERROR_LOG) || { errors: [] })
  }, [])

  return (
    <Content>
      {errorLog.errors
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((error, index) => (
          <Row key={index} {...error} />
        ))}
    </Content>
  )
}

const RowContent = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f1e1ff;
  }
  //border: 1px solid $inputs-labels-text-color;
  background-color: #ffffff;
  border-radius: 0.4rem;
  padding-top: 0.5rem;

  //color: $light-key-color;

  display: grid;
  grid-template-areas:
    'time       tag         code'
    'message    message     message';
`

const Time = styled.div`
  padding-left: 0.5rem;
  grid-area: time;
  //font-size: $smaller-size;
`
const Code = styled.div`
  grid-area: code;
  //font-size: $smaller-size;
`
const Tag = styled.div`
  grid-area: tag;
  //font-size: $smaller-size;
`
const Message = styled.div`
  grid-area: message;

  //font-size: $normal-size;

  width: 60%;

  margin-top: 0.5rem;
  padding: 0.5rem;
  //color: $main-text-color;
`

// TODO fix copy to clipboard
const Row = ({ code, message, tag, createdAt }: ErrorEntry) => {
  useEffect(() => {
    const clipboard = new Clipboard('.copy-error-clip')
    return () => clipboard.destroy()
  }, [])

  const copyText = useMemo(
    () =>
      `${dates.date2human(new Date(createdAt).toISOString())}\nTag:\t\t${tag}\nCode:\t\t${code}\nMessage:\t${message}`,
    [code, message, tag, createdAt],
  )

  return (
    <RowContent onClick={() => toasts.toastSuccess('Copied to Clipboard')} data-clipboard-text={copyText}>
      <Time>{dates.date2human(new Date(createdAt).toISOString())}</Time>
      <Code>{code}</Code>
      <Tag>{tag}</Tag>
      <Message>{message}</Message>
    </RowContent>
  )
}
