import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

function Header() {
  return (
    <header>
      <nav className="p-0 mb-4 navbar bg-neutral">
        <NavLink className="flex-1 ml-4 text-primary" to="/">
          <div className="flex">
            <img src={logo} alt="logo" className="mr-2 w-7" />
            <div>ProjectMgmt</div>
          </div>
        </NavLink>

        <div className="gap-4 mr-8 navbar-end">
          <NavLink
            to="/projects"
            style={({ isActive }) => ({ opacity: isActive ? 0.4 : 1 })}
          >
            Projects
          </NavLink>

          <NavLink
            to="/clients"
            style={({ isActive }) => ({ opacity: isActive ? 0.4 : 1 })}
          >
            Clients
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
