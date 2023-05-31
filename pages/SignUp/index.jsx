import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { API_BASE_URL } from '../../config';


// Image
import logo from '../../src/images/Logo.png';

// CSS
import styles from './SignUp.module.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidUsername = /^[a-zA-Z0-9]{5,}$/.test(username);
    const isValidPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
    const isMatchingPasswords = password === confirmPassword;

    if (!isValidUsername) {
      Swal.fire({
        title: 'Error',
        text: 'Username must be at least 5 characters long and can only contain letters and numbers.',
        icon: 'error',
        confirmButtonColor: '#0000FF',
      });
      return;
    } else if (!isValidPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Password must be strong enough. It should contain at least 8 characters, including numbers, uppercase and lowercase letters, and special characters.',
        icon: 'error',
        confirmButtonColor: '#0000FF',
      });
      return;
    } else if (!isMatchingPasswords) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonColor: '#0000FF',
      });
      return;
    } else {

      try {
        const response = await axios.post(`api/auth/register`, { username, password });
        
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Account created successfully',
          });
          router.push('/VerifyEmail', { state: { username, password } });
        }

        // Handle the response if needed
        console.log(response.data);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: ''.concat(error.response.data.message),
          icon: 'error',
          confirmButtonColor: '#0000FF',
        });
      }
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
              <h4>Create your account</h4>
            </Form.Group>

            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.bg_input}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.bg_input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-5">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.bg_input}
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
