import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import axios from 'axios';

// Image
import logo from '../../src/images/Logo.png';

// CSS
import styles from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a request to the server to send the verification code
      const response = await axios.post(`/api/verificationcode/send-verification-code`, { email }); 

      if (response.status === 200) {
        const { code } = response.data;

        // Redirect to the verify-enter-code page with email and code as parameters
        router.push({
          pathname: '/VerifyEnterCode',
          query: { email, code },
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to send verification code. Please try again.',
        icon: 'error',
        confirmButtonColor: '#0000FF',
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className={`text-center mb-5 mt-4 ${styles.logo_container}`}>
            <img src={logo.src} alt="Logo" className="img-fluid" />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h4>Enter your email</h4>
              <p>Please enter your email address to create a new account</p>
            </Form.Group>
            <br /> <br />

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={styles.bg_input}
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

export default VerifyEmail;
