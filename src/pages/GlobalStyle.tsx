/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createGlobalStyle } from 'styled-components'
import FontUbuntuRegular from '../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'
import FontUbuntuItalic from '../assets/fonts/Ubuntu/Ubuntu-Italic.ttf'
import FontUbuntuBold from '../assets/fonts/Ubuntu/Ubuntu-Bold.ttf'
import FontUbuntuBoldItalic from '../assets/fonts/Ubuntu/Ubuntu-BoldItalic.ttf'
import FontUbuntuLight from '../assets/fonts/Ubuntu/Ubuntu-Light.ttf'
import FontUbuntuLightItalic from '../assets/fonts/Ubuntu/Ubuntu-LightItalic.ttf'
import FontUbuntuMedium from '../assets/fonts/Ubuntu/Ubuntu-Medium.ttf'
import FontUbuntuMediumItalic from '../assets/fonts/Ubuntu/Ubuntu-MediumItalic.ttf'

export const GlobalStyle = createGlobalStyle`
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
    background: ${({ theme }) => theme.scrollBar.trackColor};
    border-radius: 50px;
    box-sizing: border-box;
   padding:0 20px;
   margin: 0 20px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollBar.handleColor};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollBar.handleColorHover};
  }
`
