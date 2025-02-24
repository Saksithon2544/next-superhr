import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Woman1Image from '../../src/images/Whoareyou_Woman1.jpg';
import Man1Image from '../../src/images/Whoareyou_Man1.jpg';
import Business0003Image from '../../src/images/Whoareyou_Business_0003.jpg';

// CSS
import styles from './WhoAreYou.module.css';




function WhoAreYou(props) {
  const router = useRouter();
  const [selectedRole] = useState('');
  console.log(router.query);


  function handleLinkClick(route, role) {
    let confirmationText = '';
    if (role === 'intern') {
      confirmationText = 'Are you currently choosing an intern role?';
    } else if (role === 'jobseeker') {
      confirmationText = 'Are you currently choosing an jobseeker role?';
    } else if (role === 'employee') {
      confirmationText = 'Are you currently choosing an employee role?';
    }

    Swal.fire({
      title: 'Confirmation',
      text: confirmationText,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0000FF',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#FF0000',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, navigate to the specified route
        router.push({
          pathname: route,
          query: router.query,
        });
      }
    });
  }

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1 className={styles.text_padding}>Select your role</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={8} className="mb-4">
          <div
            className={`role-card ${styles.img_container} ${selectedRole === 'intern' ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleLinkClick('/Register/Intern', 'intern')}
          >
            <div className="role-card-inner">
              <div className="role-icon">
                <Image src={Woman1Image.src} alt="Woman1" fluid />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} className="mb-4">
          <div
            className={`role-card ${styles.img_container} ${selectedRole === 'jobseeker' ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleLinkClick('/Register/JobSeeker', 'jobseeker')}
          >
            <div className="role-card-inner">
              <div className="role-icon">
                <Image src={Man1Image.src} alt="Man1" fluid />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} className="mb-4">
          <div
            className={`role-card ${styles.img_container} ${selectedRole === 'employee' ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleLinkClick('/Register/Employee', 'employee')}
          >
            <div className="role-card-inner">
              <div className="role-icon">
                <Image src={Business0003Image.src} alt="Business_0003" fluid />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WhoAreYou;
