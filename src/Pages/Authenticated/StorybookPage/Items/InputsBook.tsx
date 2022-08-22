/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { LayoutRow } from '../../Components/Layout/Layout'
import { TextField } from '../../../../Components/Inputs/TextField'
import { InputLockIcon } from '../../../../Components/Icons/InputIcons'
import styled from 'styled-components'
import { TextArea } from '../../../../Components/Inputs/TextArea'
import { CenteredRow } from '../Components'

const TextAreas = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 200px;
`

const InputsBook = () => {
  return (
    <>
      <CenteredRow>
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
        <LayoutRow style={{ width: '95%' }}>
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
      </CenteredRow>
    </>
  )
}

export default InputsBook
