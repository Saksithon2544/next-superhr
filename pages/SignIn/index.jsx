import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { API_BASE_URL } from '../../config';

// Image
import logo from '../../src/images/Logo.png';


// CSS
import styles from './SignIn.module.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const response = await axios.post(`api/auth/login`, {
        username,
        password,
      });

      const data = await response.data;

      
      if (response.status === 200) {
        localStorage.setItem('token',data.token);
        localStorage.setItem('user', JSON.stringify(data));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successfully',
        });
        router.push('/Home');
      }
    }
    catch (error) {
      const data = await error.response.data;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ''.concat(data.message).concat(data.errCode),
      }).then((result) => {
        switch (data.errCode) {
          case "A001":
            router.push(`/WhoAreYou?username=${username}&email=${data.email}`);
            break;
          case "A002":
            router.push('/VerifyEmail?username='+username);
            break;
        
          default:
            break;
        }
      });
    }

  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-5 mt-4 {styles.logo_container}">
            <img src={logo.src} alt="Logo" className="img-fluid" />
          </div>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="formPassword" className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.bg_input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign in
            </Button>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <Form.Check type="checkbox" label="Remember me" />
              <Link href="/ForgetPassword">Forgot password?</Link>
            </div>
          </Form>

          <div className="text-center mt-5">
            <span>Don't have an account? </span>
            <Link href="/SignUp">Sign up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
