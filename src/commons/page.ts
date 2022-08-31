/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const refreshPage = async (seconds: number = 0) => setTimeout(() => window.location.reload(), seconds * 1_000)

const page = {
  refreshPage,
}

export default page
