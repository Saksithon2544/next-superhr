import React, { useState } from 'react';
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
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
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
          <Col xl={8} md={8} sm={8}>
            <Form>
              <input type="text" className="form-control" placeholder="Search" />
            </Form>
          </Col>
          <Col xl={4} md={4} sm={4}>
            <Button variant="primary">Message</Button>
          </Col>
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
      </Container>
    </>
  );
};

export default Home;
