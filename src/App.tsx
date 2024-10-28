import "./App.css";
import Gotchi from "./components/Gotchi/Gotchi";
import BottomMenu from "./components/Navbar/BottomMenu";
import TopMenu from "./components/Navbar/TopMenu";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <div className="App">
      <TopMenu />
      <div className="gotchi-container">
        <Gotchi />
        <Timer />
      </div>
      <BottomMenu />
    </div>
  );
}

export default App;
