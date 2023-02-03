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
  const [hasPoop, setHasPoop] = useState(false);

  useEffect(() => {
    const now = Date.parse(new Date());

    // Get hunger, happiness and lastFeeded time from storage
    chrome.storage.local
      .get(["hunger", "happiness", "lastFeeded", "lastCuddle", "hasPoop"])
      .then((result) => {
        const {lastFeeded, lastCuddle, hunger, happiness, hasPoop} = result;

        hunger && setHunger(hunger);
        happiness && setHappiness(happiness);
        lastFeeded && setLastFeeded(lastFeeded);
        lastCuddle && setLastCuddle(lastCuddle);
        hasPoop && setHasPoop(hasPoop);

        // Substract hunger hearts after specific time.
        if (now - lastFeeded >= 3600000 && result.hunger > 0) {
          // Adds one poop when a hunger heart is substracted
          chrome.storage.local.set({ hasPoop: true }).then(() => {
            setHasPoop(true); 
          });

          const time = Math.floor((now - lastFeeded) / 3600000);
          let substractedHunger = result.hunger - time;

          if (substractedHunger < 0) {
            substractedHunger = 0;
          }

          chrome.storage.local.set({ hunger: substractedHunger }).then(() => {
            setHunger(substractedHunger);
          });
          chrome.storage.local.set({ lastFeeded: now }).then(() => {
            setLastFeeded(now);
          });
        }

        // Substract happiness hearts after specific time.
        if (now - lastCuddle >= 1800000 && result.happiness > 0) {
          const time = Math.floor((now - lastCuddle) / 1800000);
          let substractHappiness = result.happiness - time;

          if (substractHappiness < 0) {
            substractHappiness = 0;
          }

          chrome.storage.local
            .set({ happiness: substractHappiness })
            .then(() => {
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
      <TopMenu className="top-menu menu" setHasPoop={setHasPoop} />

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
                hasPoop={hasPoop}
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
