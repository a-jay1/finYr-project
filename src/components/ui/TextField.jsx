import React from 'react';

const TextField = ({ label= '',onChange, placeholder= '', type= '', required='' }) => {

  return (
    <div className="pt-6">
      <label className="text-gray-700 text-sm font-bold mb-2 hidden">
        {label}
      </label>
      <input
        onChange={onChange}
        className="shadow appearance-none border border-black-900 rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextField;
