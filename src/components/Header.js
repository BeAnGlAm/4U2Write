// This component holds the header content & show & hide content function.

import { useState } from "react";

function Header() {
  const [headerHidden, setHeaderHidden] = useState(false);

  const showFull = () => {
    setHeaderHidden(!headerHidden);
  };

  return (
    <header className={headerHidden ? "header-full" : "header-hidden"}>
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
}

export default Header;
