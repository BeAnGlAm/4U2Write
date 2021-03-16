import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserPrompt from "./UserPrompt.js";
import Header from "./Header.js";
import WritingArea from "./WritingArea.js";
import PromptSchedule from "./PromptSchedule.js";

function App() {
  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");  

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      const promptData = data.val();
      
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
  //create state for dailyPrompt and randomPrompt
  const [dailyPrompt, setDailyPrompt] = useState([]);
  const [randomPrompt, setRandomPrompt] = useState(0);
  // create random prompt function
  // pass a parameter so we can have access to other info
  const randomDailyPrompt = (maxNumberOfPrompts) => {
    return Math.floor(Math.random() * maxNumberOfPrompts);
  }
  console.log('list of all values in prompt array', Object.values(promptArray));
  // create function to generate the prompt on the page
  // need to get access to the length of the number of prompts
  const generatePrompt = () => {
    const maxNumberOfPrompts = Object.values(promptArray).length;
    console.log(maxNumberOfPrompts);
    // conditions so that same prompt isn't shown twice in a row
    let newDailyPrompt = randomDailyPrompt(maxNumberOfPrompts);
    while (newDailyPrompt === randomDailyPrompt) {
      newDailyPrompt = randomDailyPrompt(maxNumberOfPrompts);    
  }
    setRandomPrompt(newDailyPrompt);
    const randomKey = (promptArray)[randomPrompt];
    const todaysPrompt = (promptArray[randomKey]);
    setDailyPrompt(todaysPrompt);    
  }

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
      {/* added test area to generate prompt */}
      <div>
        <p>{}</p>
      </div>
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
