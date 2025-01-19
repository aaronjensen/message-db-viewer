import React from "react"
import tw from "twin.macro"

export const CopyButton = ({ value, variant = "default" }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  const buttonStyles = 
    variant === "header" 
      ? tw`opacity-0 group-hover:opacity-100 text-blue-200 hover:text-white transition-all duration-150 ease-in-out`
      : tw`opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all duration-150 ease-in-out`

  return (
    <button
      onClick={handleCopy}
      css={buttonStyles}
      title="Copy to clipboard"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
  )
} 