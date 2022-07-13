/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { TextField } from '../../../Components/Inputs/TextField'
import { InputGroup } from '../../../Components/Inputs/InputGroup'
import { InputLockIcon } from '../../../Components/Icons/InputIcons'
import { ProgressBar } from '../../../Components/ProgressBar/ProgressBar'
import { Slider } from '../../../Components/Slider/Slider'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`
export const SandboxPage = () => {
  const [earnings, setEarnings] = useState(0)

  return (
    <Layout>
      <LayoutUnstyledRow>
        <InputGroup title="Speed" subTitle="Mb" input={<TextField disabled value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField value="test test test test test testaaaaaas" disabled icon={<InputLockIcon />} />}
        />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <InputGroup title="Speed" subTitle="Mb" input={<TextField value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField value="test test test test test testaaaaaas" icon={<InputLockIcon />} />}
        />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <InputGroup title="Speed" subTitle="Mb" error="invalid data" input={<TextField error value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField error value="test" icon={<InputLockIcon $variant="error" />} />}
        />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Container>
          <ProgressBar size={'small'} settleThresholdMyst={5} earningsTokens={earnings} />
          <ProgressBar size={'big'} settleThresholdMyst={5} earningsTokens={earnings} />
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
      </LayoutUnstyledRow>
    </Layout>
  )
}
