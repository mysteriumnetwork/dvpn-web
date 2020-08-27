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
