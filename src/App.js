import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserPrompt from "./UserPrompt.js";
import Header from "./Header.js";

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
      <Header />
      <UserPrompt
        submit={handleSubmit}
        change={handleChange}
        input={textInput}
      />
    </div>
  );
}

export default App;
