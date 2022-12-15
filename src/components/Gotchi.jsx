import React from "react";

function Gotchi() {
    
  return (
    <div className="gotchi-container">
      <img className="gif" src={process.env.PUBLIC_URL + "/gotchi/gotchi.gif"} />
    </div>
  );
}

export default Gotchi;
