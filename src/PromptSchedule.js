import { useState, useEffect } from 'react';
// get current UTC

// console.log(currentDay)
// return something like 0 - 6, 0 represent Sunday
function PromptSchedule () {
  const currentDate = new Date();
// add a day
currentDate.setDate(currentDate.getDate() - 1);
console.log(currentDate);
// if day === day -1, do nothing OR push prompt if not

}

// Then we can save currentDay to firebase, so that this number is always constant and is always saved somewhere universally.

// ​
// Whenever user comes to the app and mounts the app
// we are going to run through these again 
// const currentDate = new Date();
// const currentDay = currentDay.getUTCDay();
// we are also going to grab that property from firebase
// ... some code that grabs the day we saved from firebase, save it into a variable/state call it savedDay or something
// then we can compare the currentDay to the savedDay
// if (currentDay !== savedDay) { 
//   if the days are different, then that means it's a new day in UTC time. 
//   update firebase savedDay with the new value
//   ... code that gets a different prompt
// }

const [dayState, setDayState] = useState([]);

useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {
      const promptData = data.val();
      
      const promptItems = [];
      for (let promptKey in promptData) {
        promptArray.pull({
          uniqueKey: promptKey,
          userPrompt: promptData[promptKey],
        });
      }
      setPromptArray(promptData);
    });
  }, []);



export default PromptSchedule;














// OLD CODE
// //create state for dailyPrompt and randomPrompt
//   const [dailyPrompt, setDailyPrompt] = useState([]);
//   const [randomPrompt, setRandomPrompt] = useState(0);
//   // create random prompt function
//   // pass a parameter so we can have access to other info
//   const randomDailyPrompt = (maxNumberOfPrompts) => {
//     return Math.floor(Math.random() * maxNumberOfPrompts);
//   }
//   console.log('list of all values in prompt array', Object.values(promptArray));
//   console.log(Object.values(promptArray).length)
//   // create function to generate the prompt on the page
//   // need to get access to the length of the number of prompts
//   const generatePrompt = () => {
//     const maxNumberOfPrompts = Object.values(promptArray).length;
//     console.log(maxNumberOfPrompts);
//     // conditions so that same prompt isn't shown twice in a row
//     let newDailyPrompt = randomDailyPrompt(maxNumberOfPrompts);
//     while (newDailyPrompt === randomDailyPrompt) {
//       newDailyPrompt = randomDailyPrompt(maxNumberOfPrompts);    
//   }
//   console.log(Object.values(promptArray).length);
//   generatePrompt();

//     setRandomPrompt(newDailyPrompt);
//     // const randomKey = (promptArray)[randomPrompt];
//     // const todaysPrompt = (promptArray[randomKey]);
//     // setDailyPrompt(todaysPrompt);    
//   }


