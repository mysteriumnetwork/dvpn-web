/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QualityBarsIcon } from '../../../../Components/Icons/Icons'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { InfoIcon } from '../../../../Components/Icons/Icons'
import * as React from 'react'
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
      data-test-id="Quality.container"
      content={
        <>
          <QualityBarsIcon data-test-id="Quality.barsIcon" $quality={quality} />
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
          >
            <InfoIcon data-test-id="Icons.infoIcon" />
          </Tooltip>
        </>
      }
    />
  )
}
