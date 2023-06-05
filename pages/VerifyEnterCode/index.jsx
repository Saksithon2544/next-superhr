import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import axios from 'axios';

// Image
import logo from '../../src/images/Logo.png';

// CSS
import styles from './VerifyEnterCode.module.css';

const VerifyEnterCode = () => {
  const [codeValue, setCode] = useState('');
  const router = useRouter();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { code: sentCode, email, username } = router.query;

      const response = await axios.post(`/api/verifycode`, { code: sentCode, codeValue: codeValue, email });

      console.log(response.data);

      if (response.data.success === true) {
        // Code is verified, show success message
        Swal.fire({
          title: 'Verification Successful',
          text: 'Your code has been successfully verified.',
          icon: 'success',
          confirmButtonText: 'Complete',
          confirmButtonColor: '#0000FF',
        }).then((result) => {
          router.push({
            pathname: '/WhoAreYou',
            query: { username, email },
          });
        });
      } else {
        // Code is incorrect, show error message
        Swal.fire({
          title: 'Verification Failed',
          text: 'The code you entered is incorrect. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#0000FF',
        });

        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
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
              <h4>Verify Code</h4>
              <p>Verify Code has been sent to your email. Please enter the received code.</p>
            </Form.Group>
            <br /> <br />

            <Form.Group className="mb-3">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                className="bg-input"
                type="text"
                placeholder="Enter the Verification Code"
                value={codeValue}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEnterCode;
