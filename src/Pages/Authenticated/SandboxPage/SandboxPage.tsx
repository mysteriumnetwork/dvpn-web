/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { TextField } from '../../../Components/Inputs/TextField'
import { InputGroup } from '../../../Components/Inputs/InputGroup'
import { InputLockIcon } from '../../../Components/Icons/InputIcons'
import { Button, ButtonVariant } from '../../../Components/Inputs/Button'
import { ProgressBar } from '../../../Components/ProgressBar/ProgressBar'
import { Slider } from '../../../Components/Slider/Slider'
import { useState } from 'react'
import styled from 'styled-components'
import { TextArea } from '../../../Components/Inputs/TextArea'
import { Notifications } from '../Components/Notifications/Notifications'
import { CircleIndicator } from '../SettingsPage/Tabs/Advanced/CircleIndicator'
import { NATType, Variant } from '../SettingsPage/Tabs/Advanced/types'
import { NATTooltip } from '../SettingsPage/Tabs/Advanced/NATTooltip'
import { PasswordChangePage } from '../Onboarding/PasswordChangePage'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`

const TextAreas = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 200px;
`

export const SandboxPage = () => {
  return (
    <Layout>
      <LayoutRow>
        {['none', 'fullcone', 'rcone', 'prcone', 'symmetric'].map((nt) => (
          <NATTooltip type={nt as NATType} />
        ))}
      </LayoutRow>
      {[12, 16, 20, 24].map((s) => (
        <LayoutRow style={{ justifyContent: 'center' }}>
          {['ok', 'warning', 'error'].map((v) => (
            <CircleIndicator variant={v as Variant} size={s} />
          ))}
        </LayoutRow>
      ))}
      <LayoutRow style={{ justifyContent: 'center' }}>
        <Notifications />
      </LayoutRow>
      <LayoutRow>
        <InputGroup title="Speed" subTitle="Mb" input={<TextField disabled value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField value="test test test test test testaaaaaas" disabled icon={<InputLockIcon />} />}
        />
      </LayoutRow>
      <LayoutRow>
        <InputGroup title="Speed" subTitle="Mb" input={<TextField value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField value="test test test test test testaaaaaas" icon={<InputLockIcon />} />}
        />
      </LayoutRow>
      <LayoutRow>
        <InputGroup title="Speed" subTitle="Mb" error="invalid data" input={<TextField error value="test" />} />
        <InputGroup
          title="Speed"
          subTitle="Mb"
          input={<TextField error value="test" icon={<InputLockIcon $variant="error" />} />}
        />
      </LayoutRow>
      <LayoutRow>
        <Test />
      </LayoutRow>
      {BUTTON_VARIANTS.map((v) => (
        <LayoutRow>
          <Button label="Test" variant={v} />
          <Button label="Test" variant={v} rounded />
          <Button label="Test" variant={v} loading />
          <Button label="Test" variant={v} rounded loading />
          <Button label="Test" variant={v} disabled />
          <Button label="Test" variant={v} disabled rounded />
        </LayoutRow>
      ))}
      {/*<LayoutUnstyledRow>*/}
      {/*  {NODE_STATUS.map((ns) => (*/}
      {/*    <Indicator $variant={ns}>{ns}</Indicator>*/}
      {/*  ))}*/}
      {/*</LayoutUnstyledRow>*/}
      <LayoutRow>
        <TextAreas>
          <TextArea
            value={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`}
          />{' '}
          <TextArea
            value={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`}
            error
          />
          <TextArea
            value={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`}
            disabled
          />
        </TextAreas>
      </LayoutRow>
      <LayoutRow>
        <PasswordChangePage />
      </LayoutRow>
    </Layout>
  )
}

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outlined', 'blue']
// const NODE_STATUS: IndicatorVariants[] = ['online', 'offline', 'monitoringFailed']

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
