import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
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
    //stop the timer
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">You met your writing goal!</div>;
    }

    return (
      //remaing time = option value / 60
      // 
      <div className="timer">
        {/* <div className="value">{remainingTime}</div> */}
        {/* <div className="text">mins left to write</div> */}
      </div>
    );
  };

  return (
    <div className="writingTimer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="timeSelect"></label>
        <select
          name="timeSelect"
          id="TimeSelect"
          onChange={handleTimeSelect}
          value={userTimeChoice}
        >
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
        duration={600} //user select value / 60
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default WritingTimer;
