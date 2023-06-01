import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { API_BASE_URL } from '../../config';

// Images
import ThankImage from '../../src/images/Thank.jpg';

//CSS
import styles from './ConfirmInfoRegister.module.css';

const ProfileInfo = ({ formData }) => {
  return (
    <div className={styles.personal_details_container}>
      <div className={styles.profile_picture_container}>
        <div className={styles.profile_picture}>
          {formData.photoPersonal && <img src={URL.createObjectURL(formData.photoPersonal)} alt="Profile" />}
        </div>
      </div>
      <div className={styles.personal_info}>
        <p className={styles.full_name}>{formData.fullNameEng}</p>
        <p className={styles.email}>{formData.email}</p>
      </div>
    </div>
  );
};

const ConfirmInfoIntern = ({ formData }) => {
  const router = useRouter();

  const handleConfirm = () => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to confirm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0000FF',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = new FormData();
        // Append form data
        data.append('prefix', formData.prefix);
        data.append('fullNameThai', formData.fullNameThai);
        data.append('fullNameEng', formData.fullNameEng);
        data.append('idNumber', formData.idNumber);
        data.append('gender', formData.gender);
        data.append('birthday', formData.birthday);
        data.append('maritalStatus', formData.maritalStatus);
        data.append('religion', formData.religion);
        data.append('nationality', formData.nationality);
        data.append('idAddress', formData.idAddress);
        data.append('currentAddress', formData.currentAddress);
        data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('contactPerson', formData.contactPerson);
        data.append('contactPersonPhoneNumber', formData.contactPersonPhoneNumber);
        data.append('university', formData.education.university);
        data.append('educationLevel', formData.education.educationLevel);
        data.append('major', formData.education.major);
        data.append('field', formData.education.field);
        data.append('GPA', formData.education.GPA);
        data.append('position', formData.application.position);
        data.append('internshipPeriod', formData.application.internshipPeriod);
        data.append('applicationReason', formData.application.applicationReason);
        // Append other form fields
        

        // Append files
        data.append('resumeCv', formData.resumeCv);
        data.append('coverLetter', formData.coverLetter);
        data.append('transcript', formData.transcript);
        data.append('certificate', formData.certificate);
        data.append('houseRegistration', formData.houseRegistration);
        data.append('idCard', formData.idCard);
        data.append('photoPersonal', formData.photoPersonal);
        // Append other files

        axios
          .post(`https://khaki-legs-production.up.railway.app/register_intern`, data)
          .then((response) => {
            Swal.fire({
              imageUrl: ThankImage.src,
              imageAlt: 'Thank you',
              imageWidth: 400,
              imageHeight: 400,
              title: 'Thank you!',
              text: 'You are now part of the Vanness Plus Consulting Company',
              showCancelButton: false,
              confirmButtonColor: '#0000FF',
              confirmButtonText: 'OK',
            }).then(() => {
              router.push('/signin');
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while saving the form data. Please try again.',
            });
          });
      }
    });
  };

  if (!formData) {
    return (
      <Container>
        <p>No form data available</p>
      </Container>
    );
  }

  return (
    <Container className={styles.custom_form}>
      <div style={{ margin: '20px' }}>
        {/* <h1 className="mt-4 pt-4">Confirm Info Register</h1> */}

        <ProfileInfo formData={formData} />

        <Card className="mt-4 p-4">
          <Card.Header className={styles.card_header}>
            <h2>Personal Details</h2>
            <Button variant="link" className={`${styles.edit_button} text-end`}>
              <FaEdit />
            </Button>
          </Card.Header>
          <Card.Body className={styles.custom_card_body}>
            <p>
              <b>Prefix:</b> {formData.prefix}
            </p>
            <p>
              <b>Full name (Thai name):</b> {formData.fullNameThai}
            </p>
            <p>
              <b>Full name (English name):</b> {formData.fullNameEng}
            </p>
            <p>
              <b>ID number/ID Passport:</b> {formData.idNumber}
            </p>
            <p>
              <b>Gender:</b> {formData.gender}
            </p>
            <p>
              <b>Date of birth:</b> {formData.birthday}
            </p>
            <p>
              <b>Marital status:</b> {formData.maritalStatus}
            </p>
            <p>
              <b>Religion:</b> {formData.religion}
            </p>
            <p>
              <b>Nationality:</b> {formData.nationality}
            </p>
            <p>
              <b>ID (House registration) Address:</b> {formData.idAddress}
            </p>
            <p>
              <b>Current Address:</b> {formData.currentAddress}
            </p>
            <p>
              <b>Email:</b> {formData.email}
            </p>
            <p>
              <b>Phone Number:</b> {formData.phoneNumber}
            </p>
            <p>
              <b>Contact Person:</b> {formData.contactPerson}
            </p>
            <p>
              <b>Contact Person Phone Number:</b> {formData.contactPersonPhoneNumber}
            </p>
          </Card.Body>
        </Card>

        <Card className="mt-4 p-4">
          <Card.Header className={styles.card_header}>
            <h2>Education</h2>
            <Button variant="link" className={styles.edit_button}>
              <FaEdit />
            </Button>
          </Card.Header>
          <Card.Body className={styles.custom_card_body}>
            <p>
              <b>University:</b> {formData.education.university}
            </p>
            <p>
              <b>Education Level:</b> {formData.education.educationLevel}
            </p>
            <p>
              <b>Major:</b> {formData.education.major}
            </p>
            <p>
              <b>Field:</b> {formData.education.field}
            </p>
            <p>
              <b>GPA:</b> {formData.education.GPA}
            </p>
          </Card.Body>
        </Card>

        <Card className="mt-4 p-4">
          <Card.Header className={styles.card_header}>
            <h2>Application</h2>
            <Button variant="link" className={styles.edit_button}>
              <FaEdit />
            </Button>
          </Card.Header>
          <Card.Body className={styles.custom_card_body}>
            <p>
              <b>Position:</b> {formData.application.position}
            </p>
            <p>
              <b>Internship Period:</b> {formData.application.internshipPeriod}
            </p>
            <p>
              <b>Application Reason:</b> {formData.application.applicationReason}
            </p>
          </Card.Body>
        </Card>

        <Card className="mt-4 p-4">
          <Card.Header className={styles.card_header}>
            <h2>File Upload Your Documents</h2>
            <Button variant="link" className={styles.edit_button}>
              <FaEdit />
            </Button>
          </Card.Header>
          <Card.Body className={styles.custom_card_body}>
            <p>
              <b>Resume / CV:</b> {formData.resumeCv ? formData.resumeCv.name : ''}
            </p>
            <p>
              <b>Cover Letter:</b> {formData.coverLetter ? formData.coverLetter.name : ''}
            </p>
            <p>
              <b>Transcript:</b> {formData.transcript ? formData.transcript.name : ''}
            </p>
            <p>
              <b>Certificate (optional):</b> {formData.certificate ? formData.certificate.name : ''}
            </p>
            <p>
              <b>House Registration:</b> {formData.houseRegistration ? formData.houseRegistration.name : ''}
            </p>
            <p>
              <b>ID Card:</b> {formData.idCard ? formData.idCard.name : ''}
            </p>
            <p>
              <b>Photo (Personal):</b> {formData.photoPersonal ? formData.photoPersonal.name : ''}
            </p>
          </Card.Body>
        </Card>

        <div className={styles.submit_button_container}>
          <Button variant="primary" className="submit-button col-12" onClick={handleConfirm}>
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ConfirmInfoIntern;
