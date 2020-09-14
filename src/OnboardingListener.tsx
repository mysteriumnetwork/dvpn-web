/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FC, ReactComponentElement, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import './assets/styles/pages/onboarding/main.scss';
import { checkCredentialsAndTerms } from './redux/actions/onboard';

const mapDispatchToProps = { checkCredentialsAndTerms };

interface Props {
    children: ReactComponentElement<any>;
    checkCredentialsAndTerms: () => void;
}

const OnboardingListener: FC<Props> = ({ checkCredentialsAndTerms, children }) => {
    useLayoutEffect(() => {
        checkCredentialsAndTerms();
    }, []);

    return children;
};

export default connect(null, mapDispatchToProps)(OnboardingListener);
