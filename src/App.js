import firebase from './firebase';
import './App.css';
import React, { useState, useEffect, } from 'react';

function App() {

  const [promptArray, setPromptArray] = useState([]);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    // database call user prompt submission call
    const dbRef = firebase.database().ref()
    dbRef.on('value', (data) => {
      // console.log(data.val());
      const promptData = data.val();
      console.log(promptData);

      const promptItems = [];

      for (let promptKey in promptData) {
        promptArray.push(
          promptData[promptKey]
        );
      };

      setPromptArray(promptData);
    })

    // dark mode local storage check
    const currentTheme = localStorage.getItem('stylesColor');
    if(currentTheme === 'darkStyles') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }

  }, [])

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
      <h1>4 U 2 Write</h1>
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


    </div>
  );
}

export default App;
