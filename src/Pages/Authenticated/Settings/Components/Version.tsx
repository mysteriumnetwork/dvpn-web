/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import packageJson from '../../../../../package.json';

const Version = () => {
    return <div>WebUI version {packageJson.version}</div>;
};

export default Version;
