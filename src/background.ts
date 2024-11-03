/*global chrome*/

import { addMinutes } from "./utils/dates.js";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.local.set({ timerFinished: false });

    const egg = {
      id: 0,
      name: "",
      age: 0,
      hunger: 0,
      happiness: 0,
      evolves: addMinutes(new Date(), .2),
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
    };

    chrome.storage.local.set({ gotchi: egg }, () => {
      console.log("Gotchi created in Chrome Storage.");
    });

    const evolveTime = new Date(egg.evolves);
    chrome.alarms.create("eggCracked", { when: evolveTime.getTime() });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "eggCracked") {
    chrome.action.setBadgeText({ text: "1" });
    chrome.action.setBadgeBackgroundColor({ color: "#015CE6" });
  }

  if (alarm.name === "decreaseHunger") {
    chrome.storage.local.get(["gotchi"], (result) => {
      const gotchi = result.gotchi;
      if (gotchi.hunger > 0) {
        gotchi.hunger -= 1;
      }

      chrome.storage.local.set({ gotchi }, () => {
        if (gotchi.hunger <= 0) {
          chrome.action.setBadgeText({ text: "1" });
          chrome.action.setBadgeBackgroundColor({ color: "#015CE6" });
        }
      });
    });
  }
});

chrome.storage.local.get(null, (result) => {
  console.log("Chrome Storage:", result);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(`Cambio en la clave "${key}":`);
    console.log("Valor anterior:", oldValue);
    console.log("Valor nuevo:", newValue);
  }
});
