/*global chrome*/
import React from "react";
import { useNavigate } from "react-router-dom";

function Gotchi({ happiness, setHappiness, lastCuddle, setLastCuddle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (happiness < 5) {
      happiness++;
      setHappiness(happiness);
      const justCuddled = Date.parse(new Date());
      setLastCuddle(justCuddled);

      chrome.storage.local.set({ happiness, lastCuddle:justCuddled }).then(() => {
        navigate("/happy");
      });
    } else if (happiness >= 5) {
      navigate("/deny");
    }
  };

  return (
    <div className="gotchi-container">
      <button onClick={handleClick}>
        <img
          className="gif gotchi"
          alt="Chromegotchi standard animation"
          src={process.env.PUBLIC_URL + "/gotchi/chromegotchi.gif"}
        />
      </button>
    </div>
  );
}

export default Gotchi;
