import firebase from './firebase';
import './App.css';
import React, { useState, useEffect, } from 'react';

function App() {

  const [promptArray, setPromptArray] = useState([])

  useEffect(() => {

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


    });




  }, [])


  return (
    <div className="App">
      <h1>4 U 2 Write</h1>
    </div>
  );
}

export default App;
