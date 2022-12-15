import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomMenu from "./components/BottomMenu";
import Gotchi from "./components/Gotchi";
import TopMenu from "./components/TopMenu";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="App">
      <TopMenu className="top-menu menu" />

      <div className="main-screen">
        <Routes>
          <Route path="/" element={<Gotchi />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
      
      <BottomMenu />
    </div>
  );
}

export default App;
