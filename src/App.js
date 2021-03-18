import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import DisplayPrompt from "./components/DisplayPrompt";
import WritingTimer from "./components/WritingTimer"
import WritingArea from "./components/WritingArea.js";
import IdleTimer from './components/IdleTimer.js';
import PromptSubmit from "./components/PromptSubmit";
import UserPrompt from "./components/UserPrompt";
import About from "./components/About";
import Footer from './components/Footer.js';

import Swal from 'sweetalert2';  // can potentially be moved with handleSubmit and handleChange later? 

function App() {

  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [showContent, setShowContent] = useState (false);
  const [darkMode, setDarkMode] = useState(false);
  // const [activePrompt, setActivePrompt] = useState({});

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
        promptItems.push({
          uniqueKey: promptKey,
          userPrompt: promptData[promptKey],
        });
      }
      setPromptArray(promptItems);

      const todaysDate = new Date();
      const activeDateString = todaysDate.toDateString();

      const yesterdaysDate = todaysDate;
      yesterdaysDate.setDate(todaysDate.getDate() - 1);
      const yesterday = yesterdaysDate.toDateString();

      const threeDaysPast = todaysDate;
      threeDaysPast.setDate(todaysDate.getDate() - 2)
      const threeDaysAgo = threeDaysPast.toDateString();

      const randomNumber = Math.floor(Math.random() * promptItems.length);
        const promptArrayCopy = [...promptItems];
        const activeItem = promptArrayCopy.filter((item) => {
          return item.userPrompt.activeDate === activeDateString;
        })
        if (activeItem.length === 0) {
          let randomDate = promptArrayCopy[randomNumber];

          if ( randomDate.userPrompt.activeDate !== yesterday && randomDate.userPrompt.activeDate !== threeDaysAgo) {
            let dateKey = randomDate.uniqueKey;
            let updatedDate = activeDateString;
            const dbRef = firebase.database().ref();
            dbRef.child(dateKey).update({
              activeDate: updatedDate
            })
          }
          // pick random prompt and update prompts active date to be todays date << tricky! firebase has update method, unique key is important
        }
        // console.log(updatedDate);  <--REMOVE
    });
    
    // dark mode local storage check
    const currentTheme = localStorage.getItem('stylesColor');
    if(currentTheme === 'darkStyles') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, []);
  
  // console.log(promptArray); <--REMOVE
  
  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    if (textInput) {
      dbRef.push({
        prompt: textInput,
        activeDate: 0
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid prompt!'
      })
    }
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
  const activeDateString = todaysDate.toDateString();

  return (
    <div className={`App ${darkMode ? 'darkStyles' : ''}`}>
      <IdleTimer />
      <Header />
      <div className="modeSwitchWrap wrapper">
        <label 
          className={`modeSwitchLabel ${darkMode ? 'active' : ''}`} 
          onClick={handleLabelClick}
        >
          <div className="switchPath">
            <div className="switchHandle"></div>
          </div>
        </label>
      </div>
      <div className="promptFlex wrapper">
        <div className="promptBox">
          <DisplayPrompt onHide={() => setShowPrompt(!showPrompt)} />
          {showPrompt &&
            <>
              {
                promptArray.map((item) => {
                  if (item.userPrompt.activeDate === activeDateString) {
                    return(
                      <h2 className="activePrompt" key={item.uniqueKey}>
                        {item.userPrompt.prompt}
                      </h2>
                      )
                  }
                })
              }
            </>
          }
        </div>
        <WritingTimer />
      </div>
      <WritingArea />
        {/* <PromptSchedule /> */}
        <PromptSubmit onShow={() => setShowContent(!showContent)} />
        {showContent && <UserPrompt
        // && is shorthand for a ternary minus the else
          submit={handleSubmit}
          change={handleChange}
          input={textInput}
        />}
        <About />
        <Footer />
    </div>
  );
}

export default App;