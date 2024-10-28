import Bath from "../../svg/Bath";
import Feed from "../../svg/Feed";
import Light from "../../svg/Light";
import Medicine from "../../svg/Medicine";
import './Navbar.css'

function TopMenu() {
  return (
    <nav className="menu top-menu">
      <button>
        <Feed />
      </button>
      <button>
        <Bath />
      </button>
      <button>
        <Light />
      </button>
      <button>
        <Medicine />
      </button>
    </nav>
  );
}

export default TopMenu;
