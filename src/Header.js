import { useState } from 'react';

function Header() {

   const [ headerHidden, setHeaderHidden ] = useState(false);

   const showFull = () => {
      setHeaderHidden(!showFull);
   }

   return (
      <header className={ showFull ? "header-full" : "header-hidden" } >
         <div className="wrapper">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsam deserunt eos recusandae odio sequi eligendi quis iusto accusamus iure. Eos illum possimus reiciendis quam maxime vel perferendis beatae laudantium, veritatis, distinctio fuga. Asperiores consectetur voluptates excepturi sequi quos sint, unde ipsum aperiam fuga veniam ea, corrupti, tenetur beatae quae?</p>
            <nav>
               <h1>Write On</h1>
               <div>
                  <h3>Learn more</h3>
                  {/* Arrow icon */}
               </div>
            </nav>
         </div>
      </header>
   )
}

export default Header;