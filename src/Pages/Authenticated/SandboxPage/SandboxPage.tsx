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
import { Button } from '../../../Components/Inputs/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`
export const SandboxPage = () => {
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
        <Test />
      </LayoutUnstyledRow>
    </Layout>
  )
}

const Test = () => {
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
