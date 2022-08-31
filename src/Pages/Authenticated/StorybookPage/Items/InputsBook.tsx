/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { LayoutRow } from '../../Components/Layout/Layout'
import { TextField } from '../../../../Components/Inputs/TextField'
import {
  InputCopyToClipboardIcon,
  InputEmailIcon,
  InputIconVariant,
  InputLockIcon,
} from '../../../../Components/Icons/InputIcons'
import styled from 'styled-components'
import { TextArea } from '../../../../Components/Inputs/TextArea'
import { CenteredColumn } from '../Components'
import { useState } from 'react'
import CopyToClipboardButtonIcon from '../../../../Components/Inputs/CopyToClipboardButtonIcon'

const TextAreas = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 200px;
`

const InputsBook = () => {
  const [ipsum, setIpsum] = useState(
    `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  )
  const [short, setShort] = useState(`test string`)

  return (
    <>
      <CenteredColumn>
        <LayoutRow>
          <InputGroup title="Speed" subTitle="Mb" input={<TextField disabled value={short} onChange={setShort} />} />
          <InputGroup
            title="Speed"
            subTitle="Mb"
            input={
              <TextField value={ipsum} onChange={setIpsum} disabled icon={<CopyToClipboardButtonIcon text={ipsum} />} />
            }
          />
        </LayoutRow>
        <LayoutRow>
          <InputGroup title="Speed" subTitle="Mb" input={<TextField value={short} onChange={setShort} />} />
          <InputGroup
            title="Speed"
            subTitle="Mb"
            input={<TextField value={ipsum} onChange={setIpsum} icon={<CopyToClipboardButtonIcon text={short} />} />}
          />
        </LayoutRow>
        <LayoutRow>
          <InputGroup title="Speed" subTitle="Mb" input={<TextField disabled value={short} onChange={setShort} />} />
          <InputGroup
            title="Speed"
            subTitle="Mb"
            input={<TextField value={ipsum} onChange={setIpsum} disabled icon={<InputLockIcon />} />}
          />
        </LayoutRow>
        <LayoutRow>
          <InputGroup title="Speed" subTitle="Mb" input={<TextField value={short} onChange={setShort} />} />
          <InputGroup
            title="Speed"
            subTitle="Mb"
            input={<TextField value={ipsum} onChange={setIpsum} icon={<InputLockIcon />} />}
          />
        </LayoutRow>
        <LayoutRow>
          <InputGroup
            title="Speed"
            subTitle="Mb"
            error="invalid data"
            input={<TextField error value={short} onChange={setShort} />}
          />
          <InputGroup
            title="Speed"
            subTitle="Mb"
            input={<TextField error value={ipsum} onChange={setIpsum} icon={<InputLockIcon $variant="error" />} />}
          />
        </LayoutRow>
        <LayoutRow style={{ width: '95%' }}>
          <TextAreas>
            <TextArea value={ipsum} onChange={setIpsum} /> <TextArea value={ipsum} error onChange={setIpsum} />
            <TextArea value={ipsum} disabled onChange={setIpsum} />
          </TextAreas>
        </LayoutRow>
        <LayoutRow>
          {['normal', 'disabled', 'error'].map((v) => (
            <InputEmailIcon key={`InputEmailIcon-${v}`} $variant={v as InputIconVariant} />
          ))}
        </LayoutRow>
        <LayoutRow>
          {['normal', 'disabled', 'error'].map((v) => (
            <InputCopyToClipboardIcon key={`InputCopyToClipboardIcon-${v}`} $variant={v as InputIconVariant} />
          ))}
        </LayoutRow>
        <LayoutRow>
          {['normal', 'disabled', 'error'].map((v) => (
            <InputLockIcon key={`InputLockIcon-${v}`} $variant={v as InputIconVariant} />
          ))}
        </LayoutRow>
      </CenteredColumn>
    </>
  )
}

export default InputsBook
