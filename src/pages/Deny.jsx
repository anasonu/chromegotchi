import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Deny() {
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
        alt="Denying animation"
        src={process.env.PUBLIC_URL + "/gotchi/denying.gif"}
      />
    </div>
  );
}

export default Deny;
