import React from "react";

interface PropsInterface {
  logo: React.ComponentProps<any>
  name: string
}

const Header: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="authenticated--page-header">
      <div className="logo">
        <_props.logo/>
      </div>
      <div className="name">{props.name}</div>
    </div>
  );
};

export default Header;
