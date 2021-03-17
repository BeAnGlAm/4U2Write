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
import Footer from './components/Footer.js';

function App() {

  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [showContent, setShowContent] = useState (false);
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
      // console.log(promptItems);   <--REMOVE
      setPromptArray(promptItems);

      // for (let promptKey in promptData) {
      //   promptArray.push({
      //     uniqueKey: promptKey,
      //     userPrompt: promptData[promptKey],
      //   });
      // }

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
          // console.log(randomDate);  <--REMOVE
          // console.log(updatedDate);  <--REMOVE
          // console.log(dateKey);  <--REMOVE

          const dbRef = firebase.database().ref();
          dbRef.child(dateKey).update({
            activeDate: updatedDate
          })
          // pick random prompt and update prompts active date to be todays date << tricky! firebase has update method, unique key is important
        } else {
          setActivePrompt(activeItem[0]);
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
  // console.log(activeDateString);  <--REMOVE
  // console.log(promptArray);   <--REMOVE

  return (
    <div className={`App ${darkMode ? 'darkStyles' : ''}`}>
      <IdleTimer />
      <Header />
<<<<<<< HEAD
        {
          promptArray.map((item) => {
            if (item.userPrompt.activeDate === activeDateString) {
              return(
                <p>{item.userPrompt.prompt}</p>
                )
              }
          })
        }
=======
      <DisplayPrompt onHide={() => setShowPrompt(!showPrompt)} />
        {showPrompt &&<>
          {
            promptArray.map((item) => {
              if (item.userPrompt.activeDate === activeDateString) {
                return(
                  <h2>{item.userPrompt.prompt}</h2>
                  )
                }
              })
            }
        </>}
>>>>>>> a2f0ed114ca791c08102d2678378b9af32362791
      <WritingTimer />
      <WritingArea />
      <div className="modeSwitchWrap">
        <label 
          className={`modeSwitchLabel ${darkMode ? 'active' : ''}`} 
          onClick={handleLabelClick}
        >
          <div className="switchPath">
            <div className="switchHandle"></div>
          </div>
        </label>
      </div>
        {/* <PromptSchedule /> */}
        <PromptSubmit onShow={() => setShowContent(!showContent)} />
        {showContent && <UserPrompt
        // && is shorthand for a ternary minus the else
          submit={handleSubmit}
          change={handleChange}
          input={textInput}
        />}
        <Footer />
    </div>
  );
}

export default App;