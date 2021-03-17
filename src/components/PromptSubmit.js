import PromptButton from "./PromptButton";

function PromptSubmit({ onShow }) {
  return (
    <div>
      <h3>Click here to submit a prompt</h3>
      <PromptButton text='Add' onClick={onShow} />
    </div>
  )
}

export default PromptSubmit
