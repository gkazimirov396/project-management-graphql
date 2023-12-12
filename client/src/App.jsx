import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import ProjectDetailed from './pages/ProjectDetailed';

import Header from './components/layout/Header';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/clients" element={<Clients />} />

          <Route path="/projects">
            <Route index element={<Projects />} />
            <Route path=":id" element={<ProjectDetailed />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
