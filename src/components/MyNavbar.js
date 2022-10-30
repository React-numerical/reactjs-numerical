import { NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const MyNavbar = () => {
  return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Standard Methods"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/bisection">Bisection</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/falseposition">FalsePosition</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/onepoint">OnePoint</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/newtonraphson">NewtonRaphson</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/secant">Secant</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Matrix"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/gauss">Gauss Elimination</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cramer">Cramer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/jacobi">Jacobi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/seidel">Gauss Seidel</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/conjugate">Conjugate</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Interpolation Methods"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/lagrange">Lagrange</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/spline">Spline</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="/regression">Regression</Nav.Link>
          </Nav>
      </Navbar>
  );
}

export default MyNavbar