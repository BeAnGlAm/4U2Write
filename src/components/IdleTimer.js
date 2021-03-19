// component that shows an alert for when the user has been idle for 15 seconds
import { useIdleTimer } from "react-idle-timer";
import Swal from 'sweetalert2';

function IdleTimer() {

   const handleOnIdle = () => {
      if (isIdle()) {
         Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Keep writing! You got this!',
            showConfirmButton: false,
            timer: 1500
         })
      }
   }

   const {isIdle} = useIdleTimer({
      timeout: 1000 * 15,
      onIdle: handleOnIdle,
      debounce: 500
   })

   return (
      <div>
      </div>
   )
}

export default IdleTimer;