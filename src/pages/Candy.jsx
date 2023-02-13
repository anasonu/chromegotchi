import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Candy() {
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
          src={process.env.PUBLIC_URL + "/gotchi/ice-cream.gif"}
          alt="Chromegotchi eating ice cream"
        />
      </div>
    );
}

export default Candy