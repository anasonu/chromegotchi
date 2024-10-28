import { useEffect, useState } from "react";
import { getFromState, saveInState } from "../../utils/state";
import { Chromegotchi } from "../../types/Chromegotchi";
import "./Gotchi.css";

function Gotchi() {
  const [gotchiStatus, setGotchiStatus] = useState<Chromegotchi>();
  const [timerFinished, setTimerFinished] = useState<boolean>(true);

  const initializeData = async () => {
    const gotchiData = await getFromState("gotchi");
    const timerData = await getFromState("timerFinished");
    setGotchiStatus(gotchiData);
    setTimerFinished(timerData);
  };

  useEffect(() => {
    console.log(timerFinished);
  }, [timerFinished]);

  useEffect(() => {
    initializeData()

    const handleStorageChange = (changes: any, areaName: string) => {
      if (areaName === "local") {
        if (changes.gotchi) {
          setGotchiStatus(changes.gotchi.newValue);
        }
        if (changes.timerFinished) {
          setTimerFinished(changes.timerFinished.newValue);
        }
      }
    };
  
    chrome.storage.onChanged.addListener(handleStorageChange);
  
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const eggCracked = async () => {
    if (gotchiStatus) {
      const updatedGotchi = { ...gotchiStatus, id: 1 }
      await saveInState("gotchi", updatedGotchi)
    }
  }

  return (
    <div
      className={`gotchi gotchi-${gotchiStatus?.id} ${
        timerFinished && gotchiStatus?.id == 0 ? "cracking" : null
      }`}
      onAnimationEnd={eggCracked}
    />
  );
}

export default Gotchi;
