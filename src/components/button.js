import React from "react"

export const Button = ({ onClick, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  )
}
