import { useEffect, useState } from "react";
import { getFromState, saveInState } from "../../utils/state";
import { Chromegotchi } from "../../types/Chromegotchi";
import "./Gotchi.css";
import { isChromegotchi } from "../../utils/isChromegotchi";

function Gotchi() {
  const [gotchiStatus, setGotchiStatus] = useState<Chromegotchi>();

  const getData = async (key: string) => {
    const data = await getFromState(key)
    console.log('data', data)
    setGotchiStatus(data)
    return data
  }

  useEffect(() => {
    getData('gotchi')
  }, [])

  // useEffect(() => {
  //   saveInState("gotchi", gotchiStatus);
  //   console.log('gotchiStatus', gotchiStatus)
  // }, [gotchiStatus]);

  return <div className={`gotchi gotchi-${gotchiStatus?.id}`} />;
}

export default Gotchi;
