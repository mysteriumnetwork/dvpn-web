/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export class Paginator {
  constructor(totalItems: number, pageSize: number) {
    Math.ceil(totalItems / pageSize)
  }
}
