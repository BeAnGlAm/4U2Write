import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      const promptData = data.val();
      // console.log(promptData);

      const promptItems = [];

      for (let promptKey in promptData) {
        promptArray.push({
          uniqueKey: promptKey,
          userPrompt: promptData[promptKey],
        });
      }

      setPromptArray(promptData);
    });
  }, []);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(textInput);
    setTextInput("");
  };

  return (
    <div className="App">
      <h1>Write On</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="promptSubmit">
          Submit a writing prompt of your own!
        </label>
        <input
          type="text"
          id="promptSubmit"
          onChange={handleChange}
          value={textInput}
        />
        <button>Add your prompt!</button>
      </form>
    </div>
  );
}

export default App;
