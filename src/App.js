import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BottomMenu from "./components/BottomMenu";
import Gotchi from "./components/Gotchi";
import TopMenu from "./components/TopMenu";
import Candy from "./pages/Candy";
import Feed from "./pages/Feed";
import Meal from "./pages/Meal";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="App">
      <TopMenu className="top-menu menu" />

      <div className="main-screen">
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" />} />
          <Route path="/" element={<Gotchi />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/eating-meal" element={<Meal />} />
          <Route path="/candy" element={<Candy />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      
      <BottomMenu />
    </div>
  );
}

export default App;
