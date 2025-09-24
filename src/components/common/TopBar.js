import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export default function TopBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        {/* Logo/Brand prowadzi na stronę główną */}
        <Navbar.Brand as={NavLink} to="/">Waiter.app</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* Linki nawigacji */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            {/* dorzucimy kolejne linki później (np. About) */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
