/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UsePaginationOptions, UsePaginationState } from 'react-table'

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<D extends Record<string, unknown>> extends UsePaginationOptions<D> {}

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationInstanceProps<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationState<D> {}
}
