/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredColumn } from '../Components'
import styled from 'styled-components'
import { Slider } from '../../../../components/Slider/Slider'
import { useState } from 'react'

const Wrapper = styled.div`
  position: absolute;
  bottom: 10%;
  width: 60%;
`

const PieChartBook = () => {
  const [width, setWidth] = useState(150)
  const [progress, setProgress] = useState(33)
  return (
    <CenteredColumn>
      <Wrapper>
        <Slider value={width} max={600} onChange={(w) => setWidth(w as number)} />
        <Slider value={progress} max={100} onChange={(w) => setProgress(w as number)} />
      </Wrapper>
    </CenteredColumn>
  )
}

export default PieChartBook
