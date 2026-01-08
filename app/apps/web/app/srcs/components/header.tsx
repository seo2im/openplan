import React from 'react';

type HeaderProps = {
  color: string;
};
const Header: React.FC<HeaderProps> = ({ color }) => {
  return (
    <div className="h-13 flex flex-col justify-center items-center w-full mb-10">
      <p className="text-[15px] font-medium" style={{ color }}>
        임성연
      </p>
    </div>
  );
};

export default Header;
