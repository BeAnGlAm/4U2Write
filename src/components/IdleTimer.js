import { useIdleTimer } from "react-idle-timer";

function IdleTimer() {

  const handleOnIdle = () => {
    if (isIdle()) {
        console.log('user is idle')
    };
  }

  const {isIdle} = useIdleTimer({
    timeout: 1000 * 15,
    onIdle: handleOnIdle,
    debounce: 500
  })

  const idleWarning = () => {
    if (isIdle) {
      return (
      <p>It's been 15 seconds</p>
      )
    }
  }

  return (
    <div>
        {/* app here */}
        {idleWarning()}
    </div>
  )
}

export default IdleTimer;