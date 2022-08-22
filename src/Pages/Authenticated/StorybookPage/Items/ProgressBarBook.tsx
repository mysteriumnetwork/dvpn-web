/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { ProgressBar } from '../../../../Components/ProgressBar/ProgressBar'
import { Button } from '../../../../Components/Inputs/Button'
import { Slider } from '../../../../Components/Slider/Slider'
import styled from 'styled-components'
import { CenteredRow } from '../Components'

const ProgressBarBook = () => {
  return (
    <CenteredRow>
      <Bars />
    </CenteredRow>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`

const Bars = () => {
  const [earnings, setEarnings] = useState(0)
  return (
    <Container>
      <ProgressBar size="small" max={5} value={earnings} />
      <ProgressBar size="big" max={5} value={earnings} />
      <Button label="Add" onClick={() => setEarnings((p) => p + 0.25)} />
      <Slider
        step={0.01}
        min={0}
        max={5}
        value={earnings}
        onChange={(earnings) => {
          /* @ts-ignore */
          setEarnings(earnings)
        }}
      />
    </Container>
  )
}

export default ProgressBarBook
