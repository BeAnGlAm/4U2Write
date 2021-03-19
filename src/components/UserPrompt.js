// This component builds and renders a section where users can submit prompt ideas that get pushed to the database

function UserPrompt({ submit, change, input }) {

  return (
    <form className="submitForm" action="" onSubmit={submit}>
      <label id="promptSubmit" htmlFor="promptSubmit">
        Submit a writing prompt of your own!
      </label>
      <input
        type="text"
        id="promptSubmit"
        onChange={change}
        value={input}
      />
      <button>Add your prompt!</button>
    </form>
  )
}

export default UserPrompt;