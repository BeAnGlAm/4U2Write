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

   return (
      <div>
         {/* app here */}
      </div>
   )
}

export default IdleTimer;