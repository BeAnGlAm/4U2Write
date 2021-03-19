// Displays/hides the user suggestion submission form on click
// Code inspired by Traversy Media: https://www.youtube.com/watch?v=w7ejDZ8SWv8

import PromptButton from "./PromptButton";

function PromptSubmit({ onShow }) {
  return (
    <div className="promptSubmit">
      <h3>Click here to submit a prompt</h3>
      <PromptButton text='Add' onClick={onShow} />
    </div>
  )
}

export default PromptSubmit
