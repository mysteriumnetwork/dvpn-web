/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import '../../../assets/styles/pages/authenticated/components/navigation.scss';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/components/navigation/Logo.svg';
import { ReactComponent as Dashboard } from '../../../assets/images/authenticated/components/navigation/Dashboard.svg';
import { ReactComponent as DashboardActive } from '../../../assets/images/authenticated/components/navigation/DashboardActive.svg';
import { ReactComponent as Sessions } from '../../../assets/images/authenticated/components/navigation/Sessiongs.svg';
import { ReactComponent as SessionsActive } from '../../../assets/images/authenticated/components/navigation/SessionsActive.svg';
import { ReactComponent as Settings } from '../../../assets/images/authenticated/components/navigation/Settings.svg';
import { ReactComponent as SettingsActive } from '../../../assets/images/authenticated/components/navigation/SettingsActive.svg';
import { ReactComponent as Wallet } from '../../../assets/images/authenticated/components/navigation/Wallet.svg';
import { ReactComponent as WalletActive } from '../../../assets/images/authenticated/components/navigation/WalletActive.svg';
import { ReactComponent as Chat } from '../../../assets/images/authenticated/components/navigation/Chat.svg';
import { DASHBOARD, SESSIONS, SETTINGS, WALLET } from '../../../constants/routes';

type Props = RouteComponentProps<any, any, any>;

const Navigation: FC<Props> = ({ location }: Props) => {
    const { pathname } = location;
    return (
        <div className="navigation wrapper">
            <Link to={DASHBOARD} className="navigation--logo">
                <Logo />
            </Link>

            <Link to={DASHBOARD} className={pathname === DASHBOARD ? 'navigation--item active' : 'navigation--item '}>
                {pathname === DASHBOARD ? <DashboardActive /> : <Dashboard />}
            </Link>
            <Link to={SESSIONS} className={pathname === SESSIONS ? 'navigation--item active' : 'navigation--item '}>
                {pathname === SESSIONS ? <SessionsActive /> : <Sessions />}
            </Link>
            <Link to={SETTINGS} className={pathname === SETTINGS ? 'navigation--item active' : 'navigation--item '}>
                {pathname === SETTINGS ? <SettingsActive /> : <Settings />}
            </Link>
            <Link to={WALLET} className={pathname === WALLET ? 'navigation--item active' : 'navigation--item '}>
                {pathname === WALLET ? <WalletActive /> : <Wallet />}
            </Link>
            <div className="navigation--flex-gow" />
            <div className="navigation--chat">
                <Chat />
            </div>
        </div>
    );
};
export default withRouter(Navigation);
