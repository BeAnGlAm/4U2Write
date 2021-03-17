import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserPrompt from "./UserPrompt.js";
import Header from "./Header.js";
import WritingTimer from "./WritingTimer"
import WritingArea from "./WritingArea.js";

function App() {
  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [showContent, setShowContent] = useState (false)

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
      <Header />
      <WritingTimer />
      <WritingArea />
      <div>
        <h3>Click here to submit a prompt</h3>
        <button>Add</button>
          {showContent && <UserPrompt
          {/* // && is shorthand for a ternary minus the else */}
            submit={handleSubmit}
            change={handleChange}
            input={textInput}
          />}
      </div>
    </div>
  );
}

export default App;
