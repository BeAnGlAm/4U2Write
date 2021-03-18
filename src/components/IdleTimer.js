import { useIdleTimer } from "react-idle-timer";
import { useState } from 'react';

function IdleTimer() {

   const [userIdle, setUserIdle] = useState(false);

   const handleOnIdle = () => {
      if (isIdle()) {
         setUserIdle(!userIdle)
      };
   }

<<<<<<< HEAD
  return (
    <div>
        {/* app here */}
    </div>
  )
=======
   const {isIdle} = useIdleTimer({
      timeout: 1000 * 15,
      onIdle: handleOnIdle,
      debounce: 500
   })

   return (
      <div>
         <p className={userIdle ? 'userWriting' : 'userIsIdle' }></p>
      </div>
   )
>>>>>>> fede07ed7e47e1603a501f78df086981a3fd0daf
}

export default IdleTimer;