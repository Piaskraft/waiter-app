import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/common/TopBar';
import Footer from './components/common/Footer';
import HomePage from './components/pages/HomePage';
import TablePage from './components/pages/TablePage';
import NotFound from './components/pages/NotFound';

export default function App() {
  return (
    <>
      <TopBar />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table/:id" element={<TablePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
