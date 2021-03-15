import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import "./writingTimer.css";

function WritingTimer() {
  const [timeGoal, setTimeGoal] = useState(0);

  const handleTimeSelect = (event) => {
    setTimeGoal(parseInt(event.target.value));
  };

  // const timesUp = ({ remainingTime }) => {
  //   if (remainingTime === 0) {
  //     return <div className="timesUp">You met your writing goal!</div>;
  //   }
  // };

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
          <option value="" disabled selected>select time goal</option>
          <option value="600">10 mins</option>
          <option value="900">15 mins</option>
          <option value="1200">20 mins</option>
          <option value="1800">30 mins</option>
          <option value="2700">45 mins</option>
        </select>
      <CountdownCircleTimer
        // initialRemainingTime={timeGoal}
        size={75}
        trailStrokeWidth={25}
        strokeWidth={25}
        isPlaying
        duration={10} //timeGoal state needs to go here instead of 600
        colors={[["#78cad2", 0.33], ["#50869a", 0.33], ["#23395b"]]}
        onComplete={() => [false]}
      >
      {/* {timesUp} */}
      </CountdownCircleTimer>
    </div>
  );
}

export default WritingTimer;
