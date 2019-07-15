import React from "react";

const Header = props => (
  <div className="header">
    <div className="scores">
      Score: {props.score} Top Score: {props.topScore}
    </div>
  </div>
);

export default Header;