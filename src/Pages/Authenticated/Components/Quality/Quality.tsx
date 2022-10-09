/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QualityBarsIcon } from '../../../../Components/Icons/Icons'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Row = styled.div`
  display: flex;
  align-items: center;

  :before {
    content: '';
    border: 2px solid ${({ theme }) => theme.common.colorKey};
    margin-right: 4px;
    border-radius: 100%;
  }
`

export const Quality = () => {
  const [quality, setQuality] = useState(0)

  useEffect(() => {
    tequila.api.provider.quality().then((r) => setQuality(r.quality))
  }, [])

  return (
    <HeaderItem
      title="Quality"
      content={
        <>
          <QualityBarsIcon $quality={quality} />
          <Tooltip
            content={
              <Column>
                Quality depends on:
                <Row>Latency</Row>
                <Row>Bandwidth</Row>
                <Row>Uptime</Row>
                <Row>Successful connection rate</Row>
              </Column>
            }
          />
        </>
      }
    />
  )
}
