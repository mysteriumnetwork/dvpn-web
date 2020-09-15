import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import '../../../../assets/styles/pages/authenticated/pages/setings.scss';

import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface Props {
    identity: string
}

const IdentityBackup: React.FC<Props> = (props) => {
    return (
        <div>
            <p className="text-field-label">Your identity</p>
            <DefaultTextField
                stateName={'identity'}
                handleChange={() => {}}
                disabled={true}
                value={props.identity}
            />
            <Tooltip title="Coming soon!">
                <div>
                    <button className="btn btn-filled btn-center identity" disabled={true}>Backup
                        private key
                    </button>
                </div>
            </Tooltip>
        </div>
    );
};

export default IdentityBackup;
