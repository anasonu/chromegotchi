import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Meal() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 5000);
  });

  return (
    <div className="gotchi-container">
      <img
        className="gif"
        src={process.env.PUBLIC_URL + "/gotchi/eating-gotchi.gif"}
      />
    </div>
  );
}

export default Meal;
