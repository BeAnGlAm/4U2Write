import UserPrompt from "./UserPrompt";
import PromptButton from "./PromptButton";

function PromptSubmit({handleSubmit, handleChange, textInput, showContent, onShow}) {
  return (
    <div>
      <h3>Click here to submit a prompt</h3>
      <PromptButton />
        {showContent && <UserPrompt
        // && is shorthand for a ternary minus the else
          submit={handleSubmit}
          change={handleChange}
          input={textInput}
        />}
    </div>
  )
}

export default PromptSubmit
