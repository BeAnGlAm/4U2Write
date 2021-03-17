import PromptButton from "./PromptButton"

function DisplayPrompt({ onHide }) {
  return (
    <div>
      <h3>Click here to submit a prompt</h3>
      <PromptButton text='hide' onClick={onHide} />
    </div>
  )
}

export default DisplayPrompt
