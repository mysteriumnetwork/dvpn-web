/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { Layout } from '../Layout'

const DashboardPage = () => {
  return <Layout title="Dashboard" logo={<Logo />} isLoading={false} main={<>Dragons be here</>} />
}

export default DashboardPage
