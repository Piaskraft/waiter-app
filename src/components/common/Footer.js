import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <footer className="bg-light mt-5">
      <Container className="py-3 text-center text-muted">
        <small>© {new Date().getFullYear()} Waiter.app</small>
      </Container>
    </footer>
  );
}
