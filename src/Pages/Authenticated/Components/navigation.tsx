import React from "react";
import "../../../assets/styles/pages/authenticated/components/navigation.scss"

const Navigation = () => {
  return (
    <div className="navigation wrapper">
        <div className='navigation--logo'></div>
        <div className='navigation--item active'></div>
        <div className='navigation--item'></div>
        <div className="navigation--chat"></div>
    </div>
  );
};

export default Navigation;
