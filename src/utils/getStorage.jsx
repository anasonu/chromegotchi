/*global chrome*/

async function getCurrentHunger() {
  return new Promise((resolve) => {
    if (process.env.NODE_ENV === "development") {
      resolve(JSON.parse(localStorage.getItem("hunger")));
    } else {
      chrome.storage.local.get(["hunger"]).then((result) => {
        if (result.hunger) {
          resolve(result.hunger);
        }
      });
    }

    // Default value
    resolve(0);
  });
}

export { getCurrentHunger };
