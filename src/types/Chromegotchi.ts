import { addMinutes } from "../utils/dates";

export const MAX_HEARTS:number = 4;
export interface Chromegotchi {
    id: number;
    name: string;
    age: number,
    hunger: number;
    happiness: number;
    evolves: string;
    gets_sick: string;
    hh_timer: number;
    min_weight: number;
    discipline: number;
    discipline_timer: number;
    care_mistakes: number;
    illness_timer: number;
    is_sick: false;
    is_asleep: false;
    sleep_time: string;
    waking_time: string;
    injections: number;
    // lastFeeded: string;
  }

  export const defaultChromegotchis: Chromegotchi[] = [
    {
      id: 0,
      name: "",
      age: 0,
      hunger: 0,
      happiness: 0,
      evolves: addMinutes(new Date(), 5),
      gets_sick: "",
      hh_timer: 0,
      min_weight: 1,
      discipline: 0,
      discipline_timer: 0,
      care_mistakes: 0,
      illness_timer: 0,
      is_sick: false,
      is_asleep: false,
      sleep_time: "",
      waking_time: "",
      injections: 0,
      // lastFeeded: ""
    },
    {
      id: 1,
      name: "",
      age: 0,
      hunger: 0,
      happiness: 0,
      evolves: addMinutes(new Date(), 60),
      gets_sick: "",
      hh_timer: 3,
      min_weight: 2,
      discipline: 0,
      discipline_timer: 0,
      care_mistakes: 0,
      illness_timer: 0,
      is_sick: false,
      is_asleep: false,
      sleep_time: "40min de nacer",
      waking_time: "5min de dormir",
      injections: 0,
      // lastFeeded: ""
    }
  ]