// A general button for use on multiple components and functions

import { HiChevronDown } from "react-icons/hi";

function PromptButton({ onClick }) {
  
  return (
    <HiChevronDown 
    className="promptButton"
    onClick={onClick} 
    aria-label="hide reveal button"
    />
  )
}

export default PromptButton