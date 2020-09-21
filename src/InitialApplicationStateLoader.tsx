/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FC, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import './assets/styles/pages/onboarding/main.scss';
import { checkCredentialsAndTerms } from './redux/actions/onboard';

const mapDispatchToProps = { checkCredentialsAndTerms };

interface Props {
    checkCredentialsAndTerms: () => void;
}

const InitialApplicationStateLoader: FC<Props> = ({ checkCredentialsAndTerms }) => {
    useLayoutEffect(() => {
        checkCredentialsAndTerms();
    }, []);

    return null;
};

export default connect(null, mapDispatchToProps)(InitialApplicationStateLoader);
