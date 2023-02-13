/*global chrome*/
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BottomMenu from "./components/BottomMenu";
import Gotchi from "./components/Gotchi";
import TopMenu from "./components/TopMenu";
import Bathroom from "./pages/Bathroom";
import Candy from "./pages/Candy";
import Deny from "./pages/Deny";
import Feed from "./pages/Feed";
import Happy from "./pages/Happy";
import Meal from "./pages/Meal";
import Profile from "./pages/Profile";

function App() {
  const [hunger, setHunger] = useState(0);
  const [lastFeeded, setLastFeeded] = useState(null);
  const [happiness, setHappiness] = useState(0);
  const [lastCuddle, setLastCuddle] = useState(null);
  const [hasPoop, setHasPoop] = useState(false);
  const [lastPoop, setLastPoop] = useState(null);

  useEffect(() => {
    const now = Date.parse(new Date());

    // Get hunger, happiness and lastFeeded time from storage
    chrome.storage.local
      .get(["hunger", "happiness", "lastFeeded", "lastCuddle", "hasPoop", "lastPoop"])
      .then((result) => {
        const { lastFeeded, lastCuddle, hunger, happiness, hasPoop, lastPoop } = result;

        hunger && setHunger(hunger);
        happiness && setHappiness(happiness);
        lastFeeded && setLastFeeded(lastFeeded);
        lastCuddle && setLastCuddle(lastCuddle);
        hasPoop && setHasPoop(hasPoop);

        // Adds poop every 1h 10min
        if(typeof lastPoop === "undefined") {
          chrome.storage.local.set({ lastPoop: now }).then(() => {
            setLastPoop(now);
          });
        }

        if(!hasPoop && now - lastPoop >= 4200000) {
          chrome.storage.local.set({ hasPoop: true }).then(() => {
            setHasPoop(true);
          });
        }

        // Substract hunger hearts after specific time (1h).
        if (now - lastFeeded >= 3600000 && hunger > 0) {
          const time = Math.floor((now - lastFeeded) / 3600000); //Converted to hours
          let substractedHunger = hunger - time;

          if (substractedHunger < 0) {
            substractedHunger = 0;
          }

          chrome.storage.local
            .set({ hunger: substractedHunger, lastFeeded: now })
            .then(() => {
              setHunger(substractedHunger);
              setLastFeeded(now);
            });
        }

        // Substract happiness hearts after specific time (1/2h).
        if (now - lastCuddle >= 1800000 && happiness > 0) {
          const time = Math.floor((now - lastCuddle) / 1800000);
          let substractHappiness = happiness - time;

          if (substractHappiness < 0) {
            substractHappiness = 0;
          }

          chrome.storage.local
            .set({ happiness: substractHappiness, lastCuddle: now })
            .then(() => {
              setHappiness(substractHappiness);
              setLastCuddle(now);
            });
        }
      });
  }, []);

  return (
    <div className="App">
      <TopMenu
        className="top-menu menu"
        hasPoop={hasPoop}
        setHasPoop={setHasPoop}
        lastPoop={lastPoop}
        setLastPoop={setLastPoop}
      />

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
          <Route path="/bathroom" element={ <Bathroom /> } />
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
