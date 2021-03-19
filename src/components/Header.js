// This component holds the header content & show & hide content function.

import { useState } from "react";

function Header() {

  return (
    <header>
      <div className="wrapper">
        <nav>
          <h1>WriteOn</h1>
          <div>
            <h3><a href="#about">About</a></h3>
            {/* Arrow icon */}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
