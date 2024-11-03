import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Gotchi from "./components/Gotchi/Gotchi";
import BottomMenu from "./components/Navbar/BottomMenu";
import TopMenu from "./components/Navbar/TopMenu";
import Timer from "./components/Timer/Timer";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";

function App() {
  return (
    <div className="App">
      <TopMenu />
      <div className="app-container">
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={
              <>
                <Gotchi />
                <Timer />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
      <BottomMenu />
    </div>
  );
}

export default App;
