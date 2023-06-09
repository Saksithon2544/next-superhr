import React, { useState } from 'react';
import { Container, OverlayTrigger, Popover, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Head from 'next/head';

// Image
import logo from '../../src/images/Logo.png';

const Home = () => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  const handlePopoverOpen = () => {
    setShowPopover(true);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <ul className="list-unstyled">
          <li>
            <a href="#home" onClick={handlePopoverClose}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={handlePopoverClose}>About</a>
          </li>
          <li>
            <a href="#services" onClick={handlePopoverClose}>Services</a>
          </li>
          <li>
            <a href="#login" onClick={handlePopoverClose}>Login</a>
          </li>
          <li>
            <a href="#signup" onClick={handlePopoverClose}>Sign up</a>
          </li>
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="stylesheet" href="/home.css" />
      </Head>


      <div className="d-flex justify-content-between align-items-center py-3 px-4">
        <OverlayTrigger trigger="click" placement="bottom" show={showPopover} overlay={popover}>
          <Button variant="outline-primary" onClick={handlePopoverOpen}>
            Menu
          </Button>
        </OverlayTrigger>
        <img src={logo.src} alt="Logo" className="img-fluid logo-image" />
      </div>

      <br />

      <Container>
        <Row className="mt-4">
          <Col md={8}>
            <Form>
              <input type="text" className="form-control" placeholder="Search" />
            </Form>
          </Col>
          <Col md={4}>
            <Button variant="primary">Message</Button>
          </Col>
        </Row>

        <br /> <br />

        <h2 className="text-center">Documents</h2>
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
