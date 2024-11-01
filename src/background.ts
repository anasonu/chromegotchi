/*global chrome*/

import { addMinutes } from "./utils/dates.js";

chrome.storage.local.get(null, (items) => {
  console.log("Chrome Storage:", items);
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    const egg = {
      id: 0,
      name: "",
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
      is_sleep: false,
      sleep_time: "",
      waking_time: "",
      injections: 0,
    };
    
    chrome.storage.local.set({ gotchi: egg }, () => {
      console.log("Gotchi created in Chrome Storage.");
    });

    const fourMinutesFromNow = Date.now() + 240000;
    chrome.alarms.create("notifyOneMinuteLeft", { when: fourMinutesFromNow });

    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === "notifyOneMinuteLeft") {
        chrome.action.setBadgeText({ text: '1' });
        chrome.action.setBadgeBackgroundColor({ color: '#015CE6' });
      }
    });
  }
});