/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface PropsInterface {
    logo: React.ComponentProps<any>;
    name: string;
}

const Header: React.FC<PropsInterface> = (props: PropsInterface) => {
    return (
        <div className="authenticated--page-header">
            <div className="logo">
                <props.logo />
            </div>
            <div className="name">{props.name}</div>
        </div>
    );
};

export default Header;
