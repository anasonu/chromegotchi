import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Bathroom() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 6000);
  });

  return (
    <div className="gotchi-container">
      <img
        className="bathroom-gif"
        alt="Eating chicken"
        src={process.env.PUBLIC_URL + "/gotchi/bathroom.gif"}
      />
    </div>
  );
}

export default Bathroom;
