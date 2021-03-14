function UserPrompt(props) {
   return (
      <form action="" onSubmit={props.submit}>
         <label htmlFor="promptSubmit">
            Submit a writing prompt of your own!
         </label>
         <input
            type="text"
            id="promptSubmit"
            onChange={props.change}
            value={props.input}
         />
         <button>Add your prompt!</button>
      </form>
   )
}

export default UserPrompt;