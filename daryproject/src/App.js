import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Routes } from './Routes';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes className="test" />
      </Layout>
    </Router>
  );
}
