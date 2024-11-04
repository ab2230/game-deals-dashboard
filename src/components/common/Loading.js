import React from 'react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
                <div className="loader border-t-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
                <p className="ml-4 text-lg font-semibold text-gray-700">Loading deals...</p>
    </div>
  )
}
