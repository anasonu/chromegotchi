import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Gotchi from "./components/Gotchi/Gotchi";
import BottomMenu from "./components/Navbar/BottomMenu";
import TopMenu from "./components/Navbar/TopMenu";
import Timer from "./components/Timer/Timer";
import Profile from "./pages/Profile/Profile";

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
        </Routes>
        {/* <Gotchi /> */}
        {/* <Timer /> */}
      </div>
      <BottomMenu />
    </div>
  );
}

export default App;
