<<<<<<< HEAD
import { useState } from 'react';
import PromptButton from './PromptButton';
=======
// This component holds the header content & show & hide content function.
>>>>>>> e684f40089c61e98f209a304dcdb0d8ff895ae60

import { useState } from "react";

<<<<<<< HEAD
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
              <div className="learnFlex">
                <h3>Learn more</h3>
                <PromptButton />
              </div>
          </nav>
        </div>
    </header>
  )
=======
function Header() {
  const [headerHidden, setHeaderHidden] = useState(false);

  const showFull = () => {
    setHeaderHidden(!showFull);
  };

  return (
    <header className={showFull ? "header-full" : "header-hidden"}>
      <div className="wrapper">
        <p>Welcome to Write On.</p>
        <p>
          This is your space. Come as often as you’d like to get into the
          practice of writing.
        </p>
        <p>
          Feel free to write about anything at all; it might be a place to
          journal or it might be a place to get into some creative writing.
        </p>
        <p>
          If you’re feeling blocked about a writing topic, join writers from all
          over the world and use our communal daily writing prompt to help you
          get started. Please feel free to support other writers in the WriteOn
          community by submitting your own writing prompts at the bottom of the
          page.
        </p>
        <p>
          To strengthen your writing practice you can set a goal for how long
          you aim to write for. To help keep you on track to meet your goal, you
          will be gently notified if you’ve been away from your keyboard for 15
          seconds.
        </p>
        <p>
          “An artist must have enough solitude and enough connection. It takes
          practice, and the conscious building of daily ritual.” - Julia
          Cameron, The Artist’s Way.
        </p>
        <nav>
          <h1>Write On</h1>
          <div>
            <h3>Learn more</h3>
            {/* Arrow icon */}
          </div>
        </nav>
      </div>
    </header>
  );
>>>>>>> e684f40089c61e98f209a304dcdb0d8ff895ae60
}

export default Header;
