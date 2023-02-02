/*global chrome*/
import React from "react";
import { useNavigate } from "react-router-dom";

function Gotchi({ happiness, setHappiness, setLastCuddle, hasPoop }) {
  const navigate = useNavigate();
  // const [hasPoop, setHasPoop] = useState(false);

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
    { hasPoop && <img className="gif gotchi" alt="Poop" src={process.env.PUBLIC_URL + "/gotchi/poop.gif"} /> }
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
