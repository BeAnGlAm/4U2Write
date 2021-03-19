import firebase from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import DisplayPrompt from "./components/DisplayPrompt";
import WritingTimer from "./components/WritingTimer";
import WritingArea from "./components/WritingArea.js";
import IdleTimer from "./components/IdleTimer.js";
import PromptSubmit from "./components/PromptSubmit";
import UserPrompt from "./components/UserPrompt";
import About from "./components/About";
import Footer from "./components/Footer.js";
import Swal from "sweetalert2";

function App() {
  const [promptArray, setPromptArray] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      const promptData = data.val();
      const promptItems = [];
      for (let promptKey in promptData) {
        promptItems.push({
          uniqueKey: promptKey,
          userPrompt: promptData[promptKey],
        });
      }
      setPromptArray(promptItems);

      // get today's date according to user time zone, convert it into a string
      const todaysDate = new Date();
      const activeDateString = todaysDate.toDateString();
      
      const yesterdaysDate = todaysDate;
      yesterdaysDate.setDate(todaysDate.getDate() - 1);
      const yesterday = yesterdaysDate.toDateString();
      
      const threeDaysPast = todaysDate;
      threeDaysPast.setDate(todaysDate.getDate() - 2);
      const threeDaysAgo = threeDaysPast.toDateString();

      //Pick a random prompt and update it's date value to today's date
      const randomNumber = Math.floor(Math.random() * promptItems.length);
      const promptArrayCopy = [...promptItems];
      const activeItem = promptArrayCopy.filter((item) => {
        return item.userPrompt.activeDate === activeDateString;
      });

      // Make sure users don't get same prompt two days in a row
      if (activeItem.length === 0) {
        let randomDate = promptArrayCopy[randomNumber];
        if (
          randomDate.userPrompt.activeDate !== yesterday &&
          randomDate.userPrompt.activeDate !== threeDaysAgo
        ) {
          let dateKey = randomDate.uniqueKey;
          let updatedDate = activeDateString;
          const dbRef = firebase.database().ref();
          dbRef.child(dateKey).update({
            activeDate: updatedDate,
          });
        }
      }
    });

    // Dark Mode local storage check
    // Code inspired by CandDev: https://www.youtube.com/watch?v=Zgvm-mP9_3A
    const currentTheme = localStorage.getItem("stylesColor");
    if (currentTheme === "darkStyles") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    if (textInput) {
      dbRef.push({
        prompt: textInput,
        activeDate: 0,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid prompt!",
      });
    }
    setTextInput("");
  };

  //Event handler for Dark Mode toggle
  // Code inspired by CandDev: https://www.youtube.com/watch?v=Zgvm-mP9_3A
  const handleLabelClick = () => {
    if (darkMode) {
      localStorage.setItem("stylesColor", "lightStyles");
      setDarkMode(false);
    } else {
      localStorage.setItem("stylesColor", "darkStyles");
      setDarkMode(true);
    }
  };

  const todaysDate = new Date();
  const activeDateString = todaysDate.toDateString();

  return (
    <div className={`App ${darkMode ? "darkStyles" : ""}`}>
      <IdleTimer />
      <Header />
      <div className="modeSwitchWrap wrapper">
        <label
          className={`modeSwitchLabel ${darkMode ? "active" : ""}`}
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
          {showPrompt && (
            <>
              {promptArray.map((item) => {
                if (item.userPrompt.activeDate === activeDateString) {
                  return (
                    <h2 className="activePrompt" key={item.uniqueKey}>
                      {item.userPrompt.prompt}
                    </h2>
                  );
                }
              })}
            </>
          )}
        </div>
        <WritingTimer />
      </div>
      <WritingArea />
      <PromptSubmit onShow={() => setShowContent(!showContent)} />
      {showContent && (
        <UserPrompt
          submit={handleSubmit}
          change={handleChange}
          input={textInput}
        />
      )}
      <About />
      <Footer />
    </div>
  );
}

export default App;
