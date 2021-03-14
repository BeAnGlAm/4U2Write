import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useEffect } from "react";
import "./writingTimer.css";

function WritingTimer() {
  const [userTimeChoice, setUserTimeChoice] = useState("");

  const handleTimeSelect = (event) => {
    setUserTimeChoice(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserTimeChoice(userTimeChoice);
  };

  const timesUp = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timesUp">You met your writing goal!</div>;
    }
  };

  return (
    <div className="writingTimer">
      <form onSubmit={handleSubmit}>
        <select
          name="timeSelect"
          id="TimeSelect"
          aria-label="choose how long you want to write for"
          onChange={handleTimeSelect}
          value={userTimeChoice}
        >
          <option value="" disabled selected>select time goal</option>
          <option value="600">10 mins</option>
          <option value="900">15 mins</option>
          <option value="1200">20 mins</option>
          <option value="1800">30 mins</option>
          <option value="2700">45 mins</option>
        </select>
      </form>
      <CountdownCircleTimer
        trailStrokeWidth={25}
        strokeWidth={25}
        isPlaying
        duration={10} //user select value / 60
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [false]}
      >
      {timesUp}
      </CountdownCircleTimer>
    </div>
  );
}

export default WritingTimer;
