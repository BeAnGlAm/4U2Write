import { useState } from "react";
import ReactCountdownClock from 'react-countdown-clock';

function WritingTimer() {
  const [timeGoal, setTimeGoal] = useState(0);

  const handleTimeSelect = (event) => {
    setTimeGoal(parseInt(event.target.value));
  };

  function timesUp() {
    console.log("timesup")
  }

  return (
    <div className="writingTimer">
      <select
        className="timeSelect"
        name="timeSelect"
        id="timeSelect"
        aria-label="choose how long you want to write for"
        onChange={handleTimeSelect}
        value={timeGoal}
      >
        <option value="0" selected>select time goal</option>
        <option value="5">5 seconds</option>
        <option value="600">10 mins</option>
        <option value="900">15 mins</option>
        <option value="1200">20 mins</option>
        <option value="1800">30 mins</option>
        <option value="2700">45 mins</option>
      </select>
      <ReactCountdownClock
        seconds={timeGoal}
        showMilliseconds={false}
        // font={"Josefin Sans"}
        color="#78cad2"
        alpha={0.9}
        size={65}
        weight={15}
        onComplete={timesUp}
        // onComplete={() => console.log("times up!")}
      />
    </div>
  );
}

export default WritingTimer;
