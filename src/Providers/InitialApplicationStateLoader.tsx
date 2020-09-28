/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FC, useLayoutEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// import { store } from 'src/redux/store';
// import { authenticate } from 'src/redux/actions/app';
// import { checkCredentialsAndTerms } from './redux/actions/onboard';

// const mapDispatchToProps = { checkCredentialsAndTerms };

interface Props {
    // checkCredentialsAndTerms: () => void;
}

const InitialApplicationStateLoader: FC<Props> = () => {

    useLayoutEffect(() => {
        // store.dispatch(authenticate({
        //     authenticated: true,
        //     withDefaultCredentials: true
        // }))
        // checkCredentialsAndTerms();
    }, []);

    return null;
};

export default connect(null, null)(InitialApplicationStateLoader);
