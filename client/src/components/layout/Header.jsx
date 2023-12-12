import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

function Header() {
  return (
    <header>
      <nav className="p-0 mb-4 navbar bg-neutral">
        <Link className="flex-1 ml-4 text-primary" to="/">
          <div className="flex">
            <img src={logo} alt="logo" className="mr-2 w-7" />
            <div>ProjectMgmt</div>
          </div>
        </Link>
        <div className="gap-4 mr-8 navbar-end">
          <Link to="/projects">Projects</Link>
          <Link to="/clients">Clients</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
