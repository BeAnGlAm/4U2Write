import { useIdleTimer } from "react-idle-timer";

function IdleTimer() {

   const handleOnIdle = () => {
      console.log('user is idle');
   }

   const {} = useIdleTimer({
      timeout: 1000 * 60 * 14,
      onIdle: handleOnIdle,
      debounce: 1000 * 60
   })

   return (
      <div>
         {/* app here */}
      </div>
   )
}

export default IdleTimer;