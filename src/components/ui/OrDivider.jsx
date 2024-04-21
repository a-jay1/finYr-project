import React from 'react'
import { twMerge } from 'tailwind-merge'

const OrDivider = ({
    className=""
}) => {
  return (
    <div className={twMerge(`flex items-center mt-6 ${className}`)}>
      <hr className="flex-grow border-gray-500"></hr>
      <span className="mx-4 text-sm font-medium text-gray-500">or</span>
      <hr className="flex-grow border-gray-500"></hr>
    </div>
  )
}

export default OrDivider