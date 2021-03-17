function PromptButton({ text, onClick }) {

  return <button 
          className="promptButton" 
          onClick={onClick} 
          >
          {text}
          </button>
}

export default PromptButton