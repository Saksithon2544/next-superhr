import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faGrin, faBars } from '@fortawesome/free-solid-svg-icons';

function SideNavMenu() {
  const [basicCollapse1, setBasicCollapse1] = useState(true);
  const [basicCollapse2, setBasicCollapse2] = useState(false);

  return (
    <Nav className="mr-auto">
      <Nav.Link>
        <FontAwesomeIcon icon={faSmile} className="fa-fw me-3" />
        <span className="sidenav-non-slim">Link 1</span>
      </Nav.Link>
      <NavDropdown
        title={
          <>
            <FontAwesomeIcon icon={faGrin} className="fa-fw me-3" />
            <span className="sidenav-non-slim">Category 1</span>
          </>
        }
        id="basic-nav-dropdown"
        show={basicCollapse1}
        onClick={() => setBasicCollapse1(!basicCollapse1)}
      >
        <NavDropdown.Item>Link 2</NavDropdown.Item>
        <NavDropdown.Item>Link 3</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title={
          <>
            <FontAwesomeIcon icon={faGrin} className="fa-fw me-3" />
            Category 2
          </>
        }
        id="basic-nav-dropdown"
        show={basicCollapse2}
        onClick={() => setBasicCollapse2(!basicCollapse2)}
      >
        <NavDropdown.Item>Link 4</NavDropdown.Item>
        <NavDropdown.Item>Link 5</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

function App() {
  const [basicOpen, setBasicOpen] = useState(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setBasicOpen(!basicOpen)}
        />
        <Navbar.Collapse id="basic-navbar-nav" in={basicOpen}>
          <SideNavMenu />
        </Navbar.Collapse>
      </Navbar>

      <div style={{ padding: '20px' }} className="text-center">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setBasicOpen(!basicOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );
}

export default App;
