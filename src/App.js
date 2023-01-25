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
import Happy from "./pages/Happy";
import Meal from "./pages/Meal";
import Profile from "./pages/Profile";

function App() {
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [lastFeeded, setLastFeeded] = useState(null);
  const [lastCuddle, setLastCuddle] = useState(null);

  useEffect(() => {
    const now = Date.parse(new Date());

    // Get hunger, happiness and lastFeeded time from storage
    chrome.storage.local
      .get(["hunger", "happiness", "lastFeeded", "lastCuddle"])
      .then((result) => {
        const feedDate = result.lastFeeded;
        const cuddleDate = result.lastCuddle;

        if (result.hunger) {
          setHunger(result.hunger);
        }
        if (result.happiness) {
          setHappiness(result.happiness);
        }
        if (result.lastFeeded) {
          setLastFeeded(feedDate);
        }

        // Substract hunger hearts after specific time.
        if (now - feedDate >= 3600000 && result.hunger > 0) {
          const time = Math.floor((now - feedDate) / 3600000);
          const substractedHunger = result.hunger - time;

          chrome.storage.local.set({ hunger: substractedHunger }).then(() => {
            setHunger(substractedHunger);
          });
          chrome.storage.local.set({ lastFeeded: now }).then(() => {
            setLastFeeded(now);
          });
        }

        // Substract happiness hearts after specific time.
        if(now - cuddleDate >= 1800000 && result.happiness > 0) {
          const time = Math.floor((now - cuddleDate) / 1800000);
          const substractHappiness = result.happiness - time;

          chrome.storage.local.set({ happiness: substractHappiness }).then(() => {
            setHappiness(substractHappiness);
          });
          chrome.storage.local.set({ lastCuddle: now }).then(() => {
            setLastCuddle(now);
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
          <Route
            path="/"
            element={
              <Gotchi
                happiness={happiness}
                setHappiness={setHappiness}
                lastCuddle={lastCuddle}
                setLastCuddle={setLastCuddle}
              />
            }
          />
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
          <Route path="/happy" element={<Happy />} />
        </Routes>
      </div>

      <BottomMenu />
    </div>
  );
}

export default App;
