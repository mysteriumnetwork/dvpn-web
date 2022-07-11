/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import themes from '../commons/themes'
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'
import AppRouter from './AppRouter'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import { useAppSelector } from '../commons/hooks'
import FontUbuntuBold from '../assets/fonts/Ubuntu/Ubuntu-Bold.ttf'
import FontUbuntuBoldItalic from '../assets/fonts/Ubuntu/Ubuntu-BoldItalic.ttf'
import FontUbuntuLightItalic from '../assets/fonts/Ubuntu/Ubuntu-LightItalic.ttf'
import FontUbuntuLight from '../assets/fonts/Ubuntu/Ubuntu-Light.ttf'
import FontUbuntuMedium from '../assets/fonts/Ubuntu/Ubuntu-Medium.ttf'
import FontUbuntuMediumItalic from '../assets/fonts/Ubuntu/Ubuntu-MediumItalic.ttf'
import FontUbuntuItalic from '../assets/fonts/Ubuntu/Ubuntu-Italic.ttf'
import FontUbuntuRegular from '../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'

export const App = () => {
  const theme = useAppSelector(({ app }) => app.theme)
  return (
    <ThemeProvider theme={theme === 'dark' ? themes.dark : themes.light}>
      <GlobalStyle />
      <Hotkeys>
        <NodeHealthcheckBarrier>
          <AppRouter />
        </NodeHealthcheckBarrier>
      </Hotkeys>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  // UBUNTU FONTS
  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuRegular}) format("truetype");
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuItalic}) format("truetype");
    font-style: italic;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuBold}) format("truetype");
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuBoldItalic}) format("truetype");
    font-style: italic;
    font-weight: 600;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuLight}) format("truetype");
    font-style: normal;
    font-weight: 300;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuLightItalic}) format("truetype");
    font-style: italic;
    font-weight: 300;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuMedium}) format("truetype");
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url(${FontUbuntuMediumItalic}) format("truetype");
    font-style: italic;
    font-weight: 500;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Ubuntu, sans-serif;
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }


  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${themes.common.colorLightBlue};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${themes.common.colorDarkBlue};
  }
`
