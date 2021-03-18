function UserPrompt({ submit, change, input }) {
   return (
      <form className="submitForm" action="" onSubmit={submit}>
         <label htmlFor="promptSubmit">
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