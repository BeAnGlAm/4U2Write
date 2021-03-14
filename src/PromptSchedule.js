import { useState, useEffect } from "react";
// this gives access to timezone/date of user - maybe we try to use this data to link to a daily change
let newDate = new Date();
  console.log(newDate);

// create a function to change prompt every 3 seconds (to test out timer)
function PromptSchedule() {
  // need to access firebase data array, for now have created my own array
  let prompt = ["love", "spring", "aliens"];  
  // create state for time in seconds
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(second => (second === 2 ? 0 : second + 1))
    }, 3000);
    // end of interval, restart from beginning
    return () => clearInterval(interval);
    }, [seconds]);

  return (
    <div>
      <p>{prompt[seconds]}</p>
    </div>
  )
};

export default PromptSchedule;

// TIPS - if dateDay !=== dateDay then change to new prompt