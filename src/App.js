import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserPrompt from "./UserPrompt.js";
import Header from "./Header.js";
import WritingArea from "./WritingArea.js";
import PromptSchedule from "./PromptSchedule.js";

function App() {
  const [promptArray, setPromptArray] = useState("");
  const [textInput, setTextInput] = useState("");  

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      // walk through all objects we're getting back from firebase
      // check each one and see if activeDate matches todays date on any of them
      // if it does, this is our active prompt so set in state and display on the page
      // if doesnt match then we make an active prompt
      // pick random prompt and update prompts active date to be todays date << tricky! firebase has update method, unique key is important
      const promptData = data.val();
      // we will use the below logic but not set it in state
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
    dbRef.push({
      prompt: textInput,
      activeDate: null
    });
    setTextInput("");
  };

  return (
    <div className="App">
      <Header />
      <WritingArea />
      <UserPrompt
        submit={handleSubmit}
        change={handleChange}
        input={textInput}
      />
      <PromptSchedule />
    </div>
  );
}

export default App;
