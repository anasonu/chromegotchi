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
  // LocalStorage => Uncomment for localStorage
  const [hunger, setHunger] = useState(
    JSON.parse(localStorage.getItem("hunger")) || 0
  );
  const [happiness, setHappiness] = useState(
    JSON.parse(localStorage.getItem("happiness")) || 0
  );

  // ChromeStorage => Uncomment for ChromeStorage
  // const [hunger, setHunger] = useState(0);
  // useEffect(() => {
  //   chrome.storage.local.get(["hunger"]).then((result) => {
  //     if (result.hunger) {
  //       setHunger(result.hunger);
  //     }
  //   });
  // }, [hunger]);

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
