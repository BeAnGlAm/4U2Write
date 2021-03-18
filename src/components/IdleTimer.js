import { useIdleTimer } from "react-idle-timer";
import { useState } from 'react';

function IdleTimer() {

   const [userIdle, setUserIdle] = useState(false);

   const handleOnIdle = () => {
      if (isIdle()) {
         setUserIdle(!userIdle)
      };
   }

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
}

export default IdleTimer;