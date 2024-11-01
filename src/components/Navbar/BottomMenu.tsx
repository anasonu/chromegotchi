import { NavLink } from "react-router-dom";
import Minigames from "../../svg/Minigames";
import More from "../../svg/More";
import Profile from "../../svg/Profile";
import Walk from "../../svg/Walk";
import './Navbar.css'

function BottomMenu() {
  return (
    <nav className="menu bottom-menu">
      <NavLink to='/profile'>
        <Profile />
      </NavLink>
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
