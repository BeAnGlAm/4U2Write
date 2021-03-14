import firebase from './firebase';
import './App.scss';
import React, { useState, useEffect, } from 'react';

function App() {

  const [promptArray, setPromptArray] = useState([])


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
    });

    // color theme mode logic


  }, [])




  return (
    <div className="App">
      <h1>4 U 2 Write</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="promptSubmit" >Submit a writing prompt of your own!</label>
        <input type="text" id="promptSubmit" onChange={handleChange} value={textInput}/>
        <button>Add your prompt!</button>
      </form>
    </div>
  );
}

export default App;
