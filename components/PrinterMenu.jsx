import React, { useState, useEffect } from 'react';

const PrinterMenu =()=> {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Fetch options from the server when the component mounts
    // fetchOptionsFromServer();
    setOptions([{value:"מטבח",id:1, label:"מטבח"}])
  }, []);

  const fetchOptionsFromServer = async () => {
    // Replace with your API endpoint
    const response = await fetch(`${process.env.API_URL}/`);
    const data = await response.json();
    setOptions(data);
  };

  const handleOptionChange = async (event) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);

    // Fetch post data based on the selected option
    const response = await fetch(`/api/posts/${optionValue}`);
    const postData = await response.json();
    setPostData(postData);
  };

  return (
    <div className='w-full bg-black flex items-center md:mr-28'>
    <div className="relative inline-block w-full text-left">
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
      {/* Render the fetched post data here */}
    </div>
    </div>
  );
}

export default PrinterMenu;
