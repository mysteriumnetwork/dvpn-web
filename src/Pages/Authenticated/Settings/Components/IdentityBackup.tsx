/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import '../../../../assets/styles/pages/authenticated/pages/setings.scss';

import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface Props {
    identity: string;
}

const IdentityBackup = ({ identity }: Props): JSX.Element => {
    return (
        <div>
            <p className="text-field-label">Your identity</p>
            <DefaultTextField stateName={'identity'} handleChange={() => {}} disabled={true} value={identity} />
        </div>
    );
};

export default IdentityBackup;
