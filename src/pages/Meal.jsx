import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Meal() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 6000);
  });

  return (
    <div className="gotchi-container">
      <img
        className="gif"
        src={process.env.PUBLIC_URL + "/gotchi/chicken.gif"}
      />
    </div>
  );
}

export default Meal;
