/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export type Option<V extends string = string> = {
  label: string
  value: V
}

export type MetricsRange = '1d' | '7d' | '30d' | string
