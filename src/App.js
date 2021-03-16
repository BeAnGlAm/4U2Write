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
  const [darkMode, setDarkMode] = useState(false);
  

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

        // dark mode local storage check
    const currentTheme = localStorage.getItem('stylesColor');
    if(currentTheme === 'darkStyles') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
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

    //Label onClick for dark mode toggle
  const handleLabelClick = () => {
    if (darkMode) {
      localStorage.setItem('stylesColor', 'lightStyles');
      setDarkMode(false);
    } else {
      localStorage.setItem('stylesColor', 'darkStyles');
      setDarkMode(true);
    }
  }

  return (
    <div className={`App ${darkMode ? 'darkStyles' : ''}`}>
      <Header />
      <div className="modeSwitchWrap">
        <label 
          className={`modeSwitchLabel ${darkMode ? 'active' : ''}`} 
          onClick={handleLabelClick}
        >
          <div className="switchPath">
            <div className="switchHandle"></div>
          </div>
        </label>

        <WritingTimer />
        <WritingArea />
        <UserPrompt
          submit={handleSubmit}
          change={handleChange}
          input={textInput}
        />
      </div>
    </div>
  );
}

export default App;