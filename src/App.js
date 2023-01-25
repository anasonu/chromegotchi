/*global chrome*/
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BottomMenu from "./components/BottomMenu";
import Gotchi from "./components/Gotchi";
import TopMenu from "./components/TopMenu";
import Candy from "./pages/Candy";
import Deny from "./pages/Deny";
import Feed from "./pages/Feed";
import Meal from "./pages/Meal";
import Profile from "./pages/Profile";
// import { getCurrentHunger } from "./utils/getStorage";

function App() {
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [lastFeeded, setLastFeeded] = useState(null);

  useEffect(() => {
    const now = Date.parse(new Date());

    // Get hunger and lastFeeded time from storage
    chrome.storage.local.get(["hunger", "lastFeeded"]).then((result) => {
      const date = result.lastFeeded;

      if (result.hunger) {
        setHunger(result.hunger);
      }
      if (result.lastFeeded) {
        setLastFeeded(date);
      }

      // Substract a heart after specific time.
      if (now - date >= 3600000 && result.hunger > 0) {
        const time = Math.floor((now - date) / 3600000);
        const substractedHunger = result.hunger - time;
        chrome.storage.local.set({ hunger: substractedHunger }).then(() => {
          setHunger(substractedHunger);
        });
        chrome.storage.local.set({ lastFeeded: now }).then(() => {
          setLastFeeded(now);
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <TopMenu className="top-menu menu" />

      <div className="main-screen">
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" />} />
          <Route path="/" element={<Gotchi />} />
          <Route
            path="/feed"
            element={
              <Feed
                hunger={hunger}
                setHunger={setHunger}
                happiness={happiness}
                setHappiness={setHappiness}
                lastFeeded={lastFeeded}
                setLastFeeded={setLastFeeded}
              />
            }
          />
          <Route path="/eating-meal" element={<Meal />} />
          <Route path="/candy" element={<Candy />} />
          <Route
            path="/profile"
            element={<Profile happiness={happiness} hunger={hunger} />}
          />
          <Route path="/deny" element={<Deny />} />
        </Routes>
      </div>

      <BottomMenu />
    </div>
  );
}

export default App;
