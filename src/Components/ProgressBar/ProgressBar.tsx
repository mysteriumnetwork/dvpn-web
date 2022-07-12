/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../commons/themes'

export const Bar = styled('div')`
  height: 4px;
  width: 168px;
  border-radius: 10px;
  background-color: ${themes.common.colorGrayBlue};
`

const Progress = styled('div')`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 40%;
  border-radius: 10px;
  background-color: ${themes.common.colorKey};
  z-index: -1;
`
const Circle = styled('span')`
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${themes.common.colorKeyLight};
  z-index: 1;
  transform: translateY(-2px) translateX(4px);
`
export const ProgressBar = () => {
  return (
    <Bar>
      <Progress>
        <Circle />
      </Progress>
    </Bar>
  )
}
