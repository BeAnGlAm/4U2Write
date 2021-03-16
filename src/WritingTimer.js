import { useState } from "react";
import ReactCountdownClock from 'react-countdown-clock';

function WritingTimer() {
  const [timeGoal, setTimeGoal] = useState(0);

  const handleTimeSelect = (event) => {
    setTimeGoal(parseInt(event.target.value));
  };

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
        <option>select time goal</option>
        <option value="10">10 seconds</option>
        <option value="600">10 mins</option>
        <option value="900">15 mins</option>
        <option value="1200">20 mins</option>
        <option value="1800">30 mins</option>
        <option value="2700">45 mins</option>
      </select>
      <ReactCountdownClock
        seconds={timeGoal}
        showMilliseconds={false}
        // font={}
        color="#78cad2"
        alpha={0.9}
        size={75}
        weight={15}
        // handleComplete={takes a function}
      />
    </div>
  );
}

export default WritingTimer;
