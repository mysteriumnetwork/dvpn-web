/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface Props {
    identity: string;
}

const IdentityBackup = ({ identity }: Props): JSX.Element => {
    return (
        <div className="input-group">
            <div className="input-group__label">Your identity</div>
            <DefaultTextField stateName={'identity'} handleChange={() => {}} disabled={true} value={identity} />
        </div>
    );
};

export default IdentityBackup;
