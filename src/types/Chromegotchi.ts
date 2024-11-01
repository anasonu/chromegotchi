import { addMinutes } from "../utils/dates";

export interface Chromegotchi {
    id: number;
    name: string;
    age: number,
    hunger: number;
    happiness: number;
    evolves: string;
    gets_sick: string;
    hh_timer: string;
    min_weight: number;
    discipline: number;
    discipline_timer: string;
    care_mistakes: number;
    illness_timer: string;
    is_sick: false;
    is_asleep: false;
    sleep_time: string;
    waking_time: string;
    injections: number;
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
      hh_timer: "",
      min_weight: 1,
      discipline: 0,
      discipline_timer: "",
      care_mistakes: 0,
      illness_timer: "",
      is_sick: false,
      is_asleep: false,
      sleep_time: "",
      waking_time: "",
      injections: 0,
    },
    {
      id: 1,
      name: "",
      age: 0,
      hunger: 0,
      happiness: 0,
      evolves: addMinutes(new Date(), 60),
      gets_sick: "",
      hh_timer: "7",
      min_weight: 2,
      discipline: 0,
      discipline_timer: "",
      care_mistakes: 0,
      illness_timer: "",
      is_sick: false,
      is_asleep: false,
      sleep_time: "40min de nacer",
      waking_time: "5min de dormir",
      injections: 0,
    }
  ]