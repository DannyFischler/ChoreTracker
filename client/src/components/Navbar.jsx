import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Modal, Tab } from "react-bootstrap";
import Login from "./Login";
import ParentRegistration from "./ParentRegistration";

import Auth from "../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{
          width: "100%",
          color: "#ffffff",
          backgroundColor: "#b6d7a8",
          height: "50px",
          fontSize: "18px",
        }}
        fluid="true"
      >
        <Nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Nav.Link
            as={Link}
            to="/"
            style={{ marginRight: "15px", color: "#fff" }}
          >
            Home
          </Nav.Link>
          <Nav
            className="ml-auto"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Nav.Link
              as={Link}
              to="/register"
              style={{
                marginRight: "15px",
                color: "#fff",
                display: Auth.loggedIn() ? "none" : "block",
              }}
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              style={{
                marginRight: "15px",
                color: "#fff",
                display: Auth.loggedIn() ? "none" : "block",
              }}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/viewallchores"
              style={{
                marginRight: "15px",
                color: "#fff",
                display: Auth.loggedIn() ? "block" : "none",
              }}
            >
              View Chores
            </Nav.Link>
            <Nav.Link
              onClick={Auth.logout}
              style={{
                marginRight: "15px",
                color: "#fff",
                display: Auth.loggedIn() ? "block" : "none",
              }}
            >
              Logout
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/CreateChildAccount"
              style={{
                marginRight: "15px",
                color: "#fff",
                display: Auth.loggedIn()
                  ? Auth.getProfile().parentId == null
                    ? "block"
                    : "none"
                  : "none",
              }}
            >
              Child Sign Up
            </Nav.Link>
          </Nav>
        </Nav>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link as={Link} to="/register">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <ParentRegistration
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
