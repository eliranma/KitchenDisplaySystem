import React from 'react';
import sampleLogo from '../assets/AvivLogo.svg'
import Image from 'next/image';

const Header = ({ logo = sampleLogo, buisnessName="Aviv Pos" }) => {
  return (
    <div className="sticky top-0 z-50 w-full h-14 flex items-center bg-[#e4004a]">
      <Image src={logo} alt="Logo" className="h-10 w-20 ml-4" />
      <p className="text-white font-semibold mx-auto">{buisnessName}</p>
    </div>
  );
};

export default Header;
