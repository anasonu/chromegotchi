/*global chrome*/

const saveInState = (key: string, value: any): void => {
  if (window.location.hostname === "localhost") {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Saved in localstorage");
  } else {
    chrome.storage.local.set({ [key]: value }).then(() => {
      console.log(`${key} has been saved in Chrome Storage`);
    });
  }
};

const getFromState = async (key: string) => {
  if (window.location.hostname === "localhost") {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } else {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key] !== undefined ? result[key] : null;
    } catch (error) {
      console.error("Error loading from storage", error);
      return null;
    }
  }
};

const clearStorage = () => {
  chrome.storage.local.clear(() => {
    if (chrome.runtime.lastError) {
      console.error(
        "Error clearing chrome.storage.local:",
        chrome.runtime.lastError
      );
    } else {
      console.log("chrome.storage.local cleared");
    }
  });
};

export { saveInState, getFromState, clearStorage };
