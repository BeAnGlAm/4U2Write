import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserPrompt from "./UserPrompt.js";
import Header from "./Header.js";
import WritingTimer from "./WritingTimer"
import WritingArea from "./WritingArea.js";
import IdleTimer from './IdleTimer.js';
import Footer from './Footer.js';
import PromptSchedule from "./PromptSchedule.js";

function App() {

  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activePrompt, setActivePrompt] = useState({});

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      // const todaysDate = new Date();
      // const activeDate = todaysDate.getDate();
      // const activeMonth = todaysDate.getMonth();
      // const activeDateString = `${activeDate}-${activeMonth}`;
      console.log(activeDateString);
      // console.log(todaysDate)      
      // walk through all objects we're getting back from firebase
      // check each one and see if activeDate matches todays date on any of them
      // if it does, this is our active prompt so set in state and display on the page
      // if doesnt match then we make an active prompt
      // pick random prompt and update prompts active date to be todays date << tricky! firebase has update method, unique key is important
      const promptData = data.val();
      // we will use the below logic but not set it in state
      const promptItems = [];
      for (let promptKey in promptData) {
        promptItems.push({
          uniqueKey: promptKey,
          userPrompt: promptData[promptKey],
        });
      }
      console.log(promptItems);
      setPromptArray(promptItems);

      const randomNumber = Math.floor(Math.random() * promptItems.length);
        const promptArrayCopy = [...promptItems];
        const activeItem = promptArrayCopy.filter((item) => {
          return item.userPrompt.activeDate === activeDateString;
        })
        if (activeItem.length === 0) {
          let randomDate = promptArrayCopy[randomNumber];
          let dateKey = randomDate.uniqueKey;
          let datePrompt = randomDate.userPrompt.prompt;
          let updatedDate = randomDate.userPrompt.activeDate = activeDateString;
          console.log(randomDate);
          console.log(updatedDate);
          console.log(dateKey);

          const dbRef = firebase.database().ref();
          dbRef.child(dateKey).update({
            activeDate: updatedDate
          })
          // pick random prompt and update prompts active date to be todays date << tricky! firebase has update method, unique key is important
        } else {
          setActivePrompt(activeItem[0]);
        }
        // console.log(updatedDate);
    });
    
    // dark mode local storage check
    const currentTheme = localStorage.getItem('stylesColor');
    if(currentTheme === 'darkStyles') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, []);
  console.log(promptArray);
  
  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push({
      prompt: textInput,
      activeDate: 0
    });
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
  const todaysDate = new Date();
  const activeDate = todaysDate.getDate();
  const activeMonth = todaysDate.getMonth();
  const activeDateString = `${activeDate}-${activeMonth}`;
  console.log(activeDateString);
  console.log(promptArray);

  return (
    <div className={`App ${darkMode ? 'darkStyles' : ''}`}>
      <IdleTimer />
      <Header />
        {
          promptArray.map((item) => {
            if (item.userPrompt.activeDate === activeDateString) {
              return(
                <p>{item.userPrompt.prompt}</p>
                )
              }
          })
        }
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
        <Footer />
        {/* <PromptSchedule /> */}
      </div>
    </div>
  );
}

export default App;