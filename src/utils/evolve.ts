import { getFromState, saveInState } from "./state";

const evolve = async () => {
    const gotchiData = await getFromState('gotchi')
    if (gotchiData) {
      const updatedGotchi = { ...gotchiData, id: 1 };
      await saveInState("gotchi", updatedGotchi);
    }
  };

  export {evolve}