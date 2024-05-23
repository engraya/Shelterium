import React from 'react';

function SearchDropdown({ items, onChange, placeholder }) {
  return (
    <div className="relative cursor-pointer py-2">
      <div className="flex items-center justify-between space-x-5 bg-white px-4">
        <span className="menu-hover my-2 py-2 text-base font-medium text-black">
          {placeholder}
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </div>
      <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
        {items.map((item) => (
          <a
            key={item.value}
            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black"
            onClick={() => onChange(item.value)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SearchDropdown;
