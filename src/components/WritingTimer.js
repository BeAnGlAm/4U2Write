//This component builds and renders the writing goal timer to the page

import { useState, useEffect, useRef } from "react";
import { BiPauseCircle, BiPlayCircle, BiStopCircle } from "react-icons/bi";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import Swal from 'sweetalert2';

function WritingTimer() {
  const [timer, setTimer] = useState(20 * 60);
  const timeReference = useRef(null);
  const [disableStartTimer, setDisableStartTimer] = useState(false);

  //if the timer drops below 1s: clear the timeReference and stop the timer
  useEffect(() => {
    if (timer < 1) {
      clearInterval(timeReference.current);
      setDisableStartTimer(false);
    }
  }, [timer]);

  //start the timer & disable the start button
  const startTimer = () => {
    setDisableStartTimer(true);
    timeReference.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  //pause the timer and disable the pause button
  const pauseTimer = () => {
    clearInterval(timeReference.current);
    setDisableStartTimer(false);
  };

  //Stop the timer reset it to a default of 20mins
  const resetTimer = () => {
    clearInterval(timeReference.current);
    setTimer(20 * 60);
    setDisableStartTimer(false);
  };

  //decrease the timer in increments of 5mins
  const decreaseTime = () => {
    if (timer >= 300) setTimer(timer - 300);
  };

  //increase the timer in increments of 5mins
  const increaseTime = () => {
    setTimer(timer + 300);
  };

  //Alerts the user when they have met their time goal
  const timesUp = () => {
    if (timer < 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Congrats! You met your time goal!',
          showConfirmButton: false,
          timer: 1500
        })
    }
  }

  //display time as minutes : seconds
  const convertedTime = () => {
    const seconds = `0${timer % 60}`.slice(-2);
    const changeToMinutes = `${Math.floor(timer / 60)}`;
    const minutes = `0${changeToMinutes % 60}`.slice(-2);
    return `${minutes} : ${seconds}`;
  };

  return (
    <div className="writingTimer">
      <div className="writingTimerContainer">
        {/* SET TIMER + / - BUTTONS */}
        <div className="timeSetFlexContainer">
          <AiOutlineMinusSquare title="decrease goal time by five minutes" onClick={decreaseTime} />
          <AiOutlinePlusSquare title="increase goal time by five minutes" onClick={increaseTime} />
        </div>
        <div role="timer" className="timeDisplay">{convertedTime()}</div>
        {/* DISPLAY THE TIME */}
        <div>{timesUp()}</div>
        {/* START / PAUSE BUTTONS */}
        <div className="timerButtonContainer">
          <BiPlayCircle className="timerButtons" hidden={disableStartTimer} onClick={startTimer} title="start the timer"/>
          <BiPauseCircle className="timerButtons" hidden={!disableStartTimer} onClick={pauseTimer} title="pause the timer"/>
          <BiStopCircle className="timerButtons" onClick={resetTimer} title="stop and reset the timer"/>
        </div>
      </div>
    </div>
  );
}

export default WritingTimer;