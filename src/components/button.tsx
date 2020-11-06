import tw from "twin.macro"

export const Button = tw.button`
  inline-flex
  items-center
  px-4
  py-2
  border
  border-gray-300
  text-sm
  leading-5
  font-medium
  rounded-md
  text-gray-700
  bg-white
  hover:text-blue-500
  focus:outline-none
  focus:border-blue-300
  active:text-blue-800
  active:bg-blue-100
  transition
  duration-150
  ease-in-out
`
