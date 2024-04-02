/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRouteError } from 'react-router-dom'

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return (
    <div className="w-full h-screen flex justify-center items-center text-4xl flex-col gap-4">
      <div>Something has gone terribly wrong... 😿</div>
      <div className="text-xl">Please report an issue to Node UI maintainer</div>
      <code className="p-2 bg-red-50 w-6/12 text-red-600">{String(error)}</code>
    </div>
  )
}
