function PromptButton() {
  const onClick = () => {
    console.log('click');
  }
  return <button 
          className="promptButton" 
          onClick={onClick} 
          >
          Add
          </button>
}

export default PromptButton