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

function App() {
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(0);
  let lastFeeded;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setHunger(JSON.parse(localStorage.getItem("hunger")));
    } else {
      chrome.storage.local.get(["hunger"]).then((result) => {
        if (result.hunger) {
          setHunger(result.hunger);
        }
      });
    }
  }, [hunger]);

  useEffect(() => {
    const now = new Date();
    if (process.env.NODE_ENV === "development") {
      const date =
        localStorage.getItem("lastFeeded") &&
        JSON.parse(localStorage.getItem("lastFeeded"));
      if (Date.parse(now) - date >= 60000 && hunger > 0) {
        localStorage.setItem("hunger", hunger - 1);
        setHunger(hunger - 1);
      }
    } else {
      chrome.storage.local.get(["lastFeeded"]).then((result) => {
        const date = result.lastFeeded;

        // console.log(date)
        // console.log(Date.parse(now))
        // console.log(Date.parse(now) - date)
        // console.log("=====", Date.parse(now) - date >= 60000, "=====")
        // console.log("=====", Date.parse(now) - date, "=====")

        if (Date.parse(now) - date >= 60000 && hunger > 0) {
          chrome.storage.local.set({ hunger: hunger - 1 }).then(() => {
            console.log("Hola")
            setHunger(hunger - 1);
          });
        }
      });
    }
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
