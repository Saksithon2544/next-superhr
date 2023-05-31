import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { isEmail } from 'validator';
import Swal from 'sweetalert2';

// Image
import logo from '../../src/images/Logo.png';

// CSS
import './ForgetPassword.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidEmail = isEmail(email);

    if (!isValidEmail) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonColor: '#0000FF',
      });
      return;
    }

    // Display success message
    Swal.fire({
      title: 'Success',
      text: 'Email entered correctly.',
      icon: 'success',
      confirmButtonColor: '#0000FF',
    });

    // Navigate to the designated page
    router.push('/verify-enter-code');

  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-5 mt-4 logo-container">
            <img src={logo.src} alt="Logo" className="img-fluid" />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h4>Reset password</h4>
              <p>
                Please enter your email address.
                You will receive a link to create a new password via email.
              </p>
            </Form.Group>
            <br /> <br />

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="bg-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
