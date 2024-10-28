import Minigames from "../../svg/Minigames";
import More from "../../svg/More";
import Profile from "../../svg/Profile";
import Walk from "../../svg/Walk";
import './Navbar.css'

function BottomMenu() {
  return (
    <nav className="menu bottom-menu">
      <button>
        <Profile />
      </button>
      <button>
        <Walk />
      </button>
      <button>
        <Minigames />
      </button>
      <button>
        <More />
      </button>
    </nav>
  );
}

export default BottomMenu;
