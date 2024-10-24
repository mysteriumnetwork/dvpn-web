/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;

  text-align: center;
  align-items: center;
  justify-content: center;
`

const PageNotFound = () => {
  return (
    <Container>
      <h1>Page not found ️😭</h1>
    </Container>
  )
}

export default PageNotFound
