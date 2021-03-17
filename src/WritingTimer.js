import { useState, useEffect, useRef } from "react";

function WritingTimer() {
  const [timer, setTimer] = useState(20 * 60);
  const [timerActive, isTimerActive] = useState(false);
  const timeReference = useRef(null);

  const startTimer = () => {
  // if timer is active, pause it
    if (isTimerActive === true) {
      clearInterval(timeReference.current);
      isTimerActive(false);
    } else if (timer > 1) {
      //if timer is paused, start it
      isTimerActive(true);
      timeReference.current = setInterval(() => {
          setTimer((timer) => timer - 1);
      }, 1000);
    }
  };

  //if the timer drops below 1s: clear the timeReference and stop the timer
  useEffect(() => {
    if (timer < 1) {
      clearInterval(timeReference.current);
      isTimerActive(false);
    }
  }, [timer]);

  const resetTimer = () => {
    clearInterval(timeReference.current);
    isTimerActive(false);
    setTimer(20 * 60);
  };

  const stopTimer = () => {
    clearInterval(timeReference.current);
    isTimerActive(false);
  };

  const decreaseTime = () => {
    setTimer(timer - 300);
  }

  const increaseTime = () => {
    setTimer(timer + 300);
  }

    //display time as minutes : seconds
    const convertedTime = () => {
      const seconds = `0${timer % 60}`.slice(-2);
      const changeToMinutes = `${Math.floor(timer / 60)}`;
      const minutes = `0${changeToMinutes % 60}`.slice(-2);

      return `${minutes} : ${seconds}`;
    }

  return (
    <div className="writingTimer">
      <div className="writingTimerContainer">
        <button onClick={decreaseTime}>-</button>
        <button onClick={increaseTime}>+</button>
        {/* DISPLAY THE TIME */}
        <div className="timeDisplay">{convertedTime()}</div>
        {/* START / PAUSE BUTTONS */}
        <div className="timerButtons">
          <button onClick={startTimer}>Start</button>
          <button onClick={startTimer}>Pause</button>
          <button onClick={resetTimer}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default WritingTimer;

// import { useState } from "react";
// import ReactCountdownClock from 'react-countdown-clock';

// function WritingTimer() {
//   const [timeGoal, setTimeGoal] = useState(0);

//   const handleTimeSelect = (event) => {
//     setTimeGoal(parseInt(event.target.value));
//   };

//   // function timesUp() {
//   //   console.log("timesup")
//   // }

//   return (
//     <div className="writingTimer">
//       <select
//         className="timeSelect"
//         name="timeSelect"
//         id="timeSelect"
//         aria-label="choose how long you want to write for"
//         onChange={handleTimeSelect}
//         value={timeGoal}
//       >
//         <option value="0" defaultValue>select time goal</option>
//         <option value="5">5 seconds</option>
//         <option value="600">10 mins</option>
//         <option value="900">15 mins</option>
//         <option value="1200">20 mins</option>
//         <option value="1800">30 mins</option>
//         <option value="2700">45 mins</option>
//       </select>
//       <ReactCountdownClock
//         seconds={timeGoal}
//         showMilliseconds={false}
//         // font={"Josefin Sans"}
//         color="#78cad2"
//         alpha={0.9}
//         size={65}
//         weight={15}
//         // onComplete={timesUp}
//         // onComplete={() => console.log("times up!")}
//       />
//     </div>
//   );
// }

// export default WritingTimer;
