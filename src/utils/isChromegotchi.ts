import { Chromegotchi } from "../types/Chromegotchi";

export function isChromegotchi(obj: any): obj is Chromegotchi {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.id === "number" &&
      typeof obj.name === "string" &&
      typeof obj.hunger === "number" &&
      typeof obj.happiness === "number" &&
      typeof obj.evolves === "string" &&
      typeof obj.gets_sick === "string" &&
      typeof obj.hh_timer === "string" &&
      typeof obj.min_weight === "number" &&
      typeof obj.discipline === "number" &&
      typeof obj.discipline_timer === "string" &&
      typeof obj.care_mistakes === "number" &&
      typeof obj.illness_timer === "string" &&
      typeof obj.is_sick === "boolean" &&
      typeof obj.is_asleep === "boolean" &&
      typeof obj.sleep_time === "string" &&
      typeof obj.waking_time === "string" &&
      typeof obj.injections === "number"
    );
  }
  