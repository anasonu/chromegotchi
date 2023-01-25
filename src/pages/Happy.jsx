import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Happy() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div className="gotchi-container">
      <img
        className="gif"
        alt="Happy Gotchi"
        src={process.env.PUBLIC_URL + "/gotchi/happyGotchi.gif"}
      />
    </div>
  );
}

export default Happy;
