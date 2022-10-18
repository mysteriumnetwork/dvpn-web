/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import styled, { useTheme } from 'styled-components'
import { HeatAtlasLegend } from './HeatAtlasLegend'

const geoUrl = 'https://raw.githubusercontent.com/mysteriumnetwork/dvpn-web/master/world-countries.json'

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 26px;
`

export type Point = {
  country: string
  count: number
}

interface Props {
  points?: Point[]
}

const mapWidth = 400
const mapHeight = 100

export const HeatAtlas = ({ points }: Props) => {
  const { heatAtlas } = useTheme()

  const heatColor = (count: number = 0) => {
    if (count >= 200) {
      return heatAtlas.heat.m200
    }

    if (count >= 100) {
      return heatAtlas.heat.m100
    }

    if (count >= 50) {
      return heatAtlas.heat.m50
    }

    if (count > 0) {
      return heatAtlas.heat.m0
    }

    return heatAtlas.country.fill
  }

  return (
    <Container>
      <ComposableMap
        width={mapWidth}
        height={mapHeight}
        onSelect={() => {}}
        projectionConfig={{
          scale: 40,
        }}
        style={{
          backgroundColor: heatAtlas.country.stroke,
          outline: 'none',
          borderRadius: '26px',
        }}
      >
        <ZoomableGroup
          translateExtent={[
            [0, -mapHeight / 3],
            [mapWidth, mapHeight + mapHeight / 3],
          ]}
          center={[0, 0]}
          zoom={1}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = geo.properties['Alpha-2']

                return (
                  <Geography
                    style={{
                      default: {
                        outline: 'none',
                      },
                      hover: {
                        outline: 'none',
                      },
                      pressed: {
                        outline: 'none',
                      },
                    }}
                    strokeWidth={0.1}
                    tabIndex={-1}
                    fill={heatColor(points?.find((p) => p.country === countryCode)?.count)}
                    stroke={heatAtlas.country.stroke}
                    key={geo.rsmKey}
                    geography={geo}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <HeatAtlasLegend />
    </Container>
  )
}
