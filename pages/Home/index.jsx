import React, { useState, useEffect } from 'react';
import { Container, Modal, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Head from 'next/head';

// Image
import logo from '../../src/images/Logo.png';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>
            <Row className="mt-4">
              <Col xs={12} md={12}>
                <img src={logo.src} alt="Logo" className="img-fluid logo-image" />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={12} md={12}>
                <Button variant="primary" className="btn-block col-12">
                  + Create New
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <div>
            <h4>Menu</h4>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null); // เพิ่ม state สำหรับเก็บข้อมูลผู้ใช้

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ใน localStorage หรือไม่
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // console.log(user);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="stylesheet" href="/home.css" />
      </Head>

      <Container>
        <div className="d-flex justify-content-between align-items-center py-3 px-4">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Menu
          </Button>

          <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />

          <img src={logo.src} alt="Logo" className="img-fluid logo-image" />
        </div>

        <br />

        <div className="d-flex justify-content-between align-items-center py-3 px-4">
          <div className="col-10">
            <Form>
              <input type="text" className="form-control" placeholder="Search" />
            </Form>
          </div>
          <div>
            <Button variant="primary">Message</Button>
          </div>
        </div>

        <h2 className="text-center mt-5">Documents</h2>

        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title="All">
            Tab content for All
          </Tab>
          <Tab eventKey="completed" title="Completed">
            Tab content for Completed
          </Tab>
          <Tab eventKey="requireAction" title="Require Action">
            Tab content for Require Action
          </Tab>
          <Tab eventKey="requestChanges" title="Request Changes">
            Tab content for Request Changes
          </Tab>
        </Tabs>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Document 1</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Card.Text>
                <Button variant="primary">Download</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Document 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Card.Text>
                <Button variant="primary">Download</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Document 3</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Card.Text>
                <Button variant="primary">Download</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {user && (
          <div className="text-center mt-5">
            <h4>Welcome, {user.username}!</h4>
            {/* แสดงข้อมูลเพิ่มเติมของผู้ใช้ */}
            <p>Email: {user.email}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
