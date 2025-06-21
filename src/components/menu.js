import { Children } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Menu({ handellogout, children }) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-4">
        <Container>
          <Navbar.Brand href="#home">E-commerce </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/produit">
                products
              </Nav.Link>
              <Nav.Link as={Link} to="/category">
                category
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/profile">
                profile
              </Nav.Link>
              <Nav.Link onClick={handellogout}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </div>
  );
}

export default Menu;
