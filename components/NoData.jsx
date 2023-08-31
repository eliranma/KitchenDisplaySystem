import React from 'react';
import Image from 'next/image';
import NoDataSVG  from '@/assets/no_Data.svg'

const NoData = () => {
  return (
    <div className="flex flex-col items-center py-10 justify-center h-full">
    <div className=' bg-[#E9F9EE] pt-3 flex items-center flex-col rounded-lg shadow-lg' >
      <h1 className="text-xl text-gray-500 font-bold"> .... לא נמצאו הזמנות</h1>
      <Image className="mt-4" src={NoDataSVG} alt="No Data Image" />
    </div>
    </div>
  );
};

export default NoData;
