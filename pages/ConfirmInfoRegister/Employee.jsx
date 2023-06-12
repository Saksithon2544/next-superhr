import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';

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

const ConfirmInfoRegisterEmployee = ({ formData }) => {
  const router = useRouter();
  console.log(formData);

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
        // Personal Details
        data.append('username' , formData.username);
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
        // data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('position', formData.position);
        data.append('client', formData.client);

        // Social security fund detail
        if (formData.socialSecurity.paymentType === 'selfPay') {
          data.append('paymentType', formData.socialSecurity.paymentType);
          data.append('self_type', formData.socialSecurity.self_type);
          data.append('self_textDetails', formData.socialSecurity.self_textDetails);
          data.append('self_companyName', formData.socialSecurity.self_companyName);
          data.append('self_registrationNumber', formData.socialSecurity.self_registrationNumber);
          data.append('self_registrationAddress', formData.socialSecurity.self_registrationAddress);
        } else if (formData.socialSecurity.paymentType === 'companyPay') {
          data.append('paymentType', formData.socialSecurity.paymentType);
          data.append('company_joiningDate', formData.socialSecurity.company_joiningDate);

          if (formData.socialSecurity.company_hospital === 'hospitalMember') {
            data.append('company_hospitalMember_1', formData.socialSecurity.company_hospitalMember_1);
          } else if (formData.socialSecurity.company_hospital === 'changeHospital') {
            data.append('company_changeHospita_1', formData.socialSecurity.company_changeHospita_1);
            data.append('company_changeHospita_2', formData.socialSecurity.company_changeHospita_2);
            data.append('company_changeHospita_3', formData.socialSecurity.company_changeHospita_3);
          }

          data.append('company_incomeBeforeJoining', formData.socialSecurity.company_incomeBeforeJoining);
          data.append('company_withholdingTaxBeforeJoining', formData.socialSecurity.company_withholdingTaxBeforeJoining);
          data.append('company_marriedFullName', formData.socialSecurity.company_marriedFullName);
          data.append('company_marriedIdNumber', formData.socialSecurity.company_marriedIdNumber);
          data.append('company_children', formData.socialSecurity.company_children[0].name, formData.socialSecurity.company_children[0].bornAfterYear);
          data.append('company_children', formData.socialSecurity.company_children[1].name, formData.socialSecurity.company_children[1].bornAfterYear);
          data.append('company_children', formData.socialSecurity.company_children[2].name, formData.socialSecurity.company_children[2].bornAfterYear);
          data.append('company_parents', formData.socialSecurity.company_parents);
          data.append('company_disabledPerson', formData.socialSecurity.company_disabledPerson);
          data.append('company_lifeInsurance', formData.socialSecurity.company_lifeInsurance);
          data.append('company_healthInsurance', formData.socialSecurity.company_healthInsurance);
          data.append('company_parentsLifeInsurance', formData.socialSecurity.company_parentsLifeInsurance);
          data.append('company_annuityInsurance', formData.socialSecurity.company_annuityInsurance);
          data.append('company_rmf', formData.socialSecurity.company_rmf);
          data.append('company_ssf', formData.socialSecurity.company_ssf);
          data.append('company_providentFund', formData.socialSecurity.company_providentFund);
          data.append('company_donation1', formData.socialSecurity.company_donation1);
          data.append('company_donation2', formData.socialSecurity.company_donation2);
          data.append('company_donation3', formData.socialSecurity.company_donation3);
        }

        // Append files
        data.append('resumeCv', formData.resumeCv);
        data.append('transcript', formData.transcript);
        data.append('certificate', formData.certificate);
        data.append('houseRegistration', formData.houseRegistration);
        data.append('idCard', formData.idCard);
        data.append('photoPersonal', formData.photoPersonal);
        data.append('photoIdCard', formData.photoIdCard);
        data.append('bankBook', formData.bankBook);
        // Append other files

        axios({
            method: 'post',
            url: '/api/employee/register',
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
          })
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
              router.push('/SignIn');
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

  console.log(formData);

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
              <b>Position:</b> {formData.position}
            </p>
            <p>
              <b>Client:</b> {formData.client}
            </p>
          </Card.Body>
        </Card>

        <Card className="mt-4 p-4">
          <Card.Header className={styles.card_header}>
            <h2>Social security fund detail</h2>
            <Button variant="link" className={styles.edit_button}>
              <FaEdit />
            </Button>
          </Card.Header>
          <Card.Body className={styles.custom_card_body}>
            {formData.socialSecurity.paymentType === 'selfPay' &&
              <>
                <p>
                  <b>Payment by:</b> {formData.socialSecurity.paymentType}
                </p>
                <p>
                  <b>Type:</b> {formData.socialSecurity.self_type}
                </p>
                <p>
                  <b>Tax Detail:</b> {formData.socialSecurity.self_textDetails}
                </p>
                <p>
                  <b>Company Name:</b> {formData.socialSecurity.self_companyName}
                </p>
                <p>
                  <b>Registration Number:</b> {formData.socialSecurity.self_registrationNumber}
                </p>
                <p>
                  <b>Registration Number:</b> {formData.socialSecurity.self_registrationAddress}
                </p>
              </>
            }

            {formData.socialSecurity.paymentType === 'companyPay' &&
              <>
                <p>
                  <b>Payment by:</b> {formData.socialSecurity.paymentType}
                </p>
                <p>
                  <b>Joining Date:</b> {formData.socialSecurity.company_joiningDate}
                </p>

                {formData.socialSecurity.company_hospital === 'hospitalMember' &&
                  <>
                    <p>
                      <b>Member with:</b> {formData.socialSecurity.company_hospitalMember_1}
                    </p>
                  </>
                }

                {formData.socialSecurity.company_hospital === 'changeHospital' &&
                  <>
                    <p>
                      <b>Change Hospital/Non-member</b>
                    </p>
                    <p>
                      <b>1.</b> {formData.socialSecurity.company_changeHospita_1}
                    </p>
                    <p>
                      <b>2.</b> {formData.socialSecurity.company_changeHospita_2}
                    </p>
                    <p>
                      <b>3.</b> {formData.socialSecurity.company_changeHospita_3}
                    </p>
                  </>
                }
                <h5 className={`text-start ${styles.custom_form_group} mt-5`}>TAX Detail</h5>
                <p>
                  <b>Income before joining:</b> {formData.socialSecurity.company_incomeBeforeJoining}
                </p>
                <p>
                  <b>Withholding tax before joining:</b> {formData.socialSecurity.company_withholdingTaxBeforeJoining}
                </p>
                <p>
                  <b>Married Full Name:</b> {formData.socialSecurity.company_marriedFullName}
                </p>

                <h5 className={`text-start ${styles.custom_form_group} mt-5`}>Children (Age 1-20 years, Born after year 2018)</h5>
                <p>
                  <b>First child's name:</b> {formData.socialSecurity.company_children[0].name} , {formData.socialSecurity.company_children[0].bornAfterYear}
                </p>
                <p>
                  <b>Second child's name:</b> {formData.socialSecurity.company_children[1].name} , {formData.socialSecurity.company_children[1].bornAfterYear}
                </p>
                <p>
                  <b>Third child's name:</b> {formData.socialSecurity.company_children[2].name} , {formData.socialSecurity.company_children[2].bornAfterYear}
                </p>
                <p>
                  <b>Parents:</b> {formData.socialSecurity.company_parents}
                </p>
                <p>
                  <b>Disabled Person:</b> {formData.socialSecurity.company_disabledPerson}
                </p>
                <p>
                  <b>Life insurance and Endowment (100,000 THB):</b> {formData.socialSecurity.company_lifeInsurance}
                </p>
                <p>
                  <b>Health insurance / Accident (25,000 THB):</b> {formData.socialSecurity.company_healthInsurance}
                </p>
                <p>
                  <b>Parents life insurance (15,000 THB):</b> {formData.socialSecurity.company_parentsLifeInsurance}
                </p>
                <p>
                  <b>Annuity insurance (15% of income / 200,000 THB):</b> {formData.socialSecurity.company_annuityInsurance}
                </p>
                <p>
                  <b>RMF (30% of Net income / 500,000 THB):</b> {formData.socialSecurity.company_rmf}
                </p>
                <p>
                  <b>SSF Super saving fund (30% of Net income / 200,000 THB):</b> {formData.socialSecurity.company_ssf}
                </p>
                <p>
                  <b>Provident fund PVD (15% of Net income / 500,000 THB):</b> {formData.socialSecurity.company_providentFund}
                </p>

                <h5 className={`text-start ${styles.custom_form_group} mt-5`}>Donation</h5>
                <p>
                  <b>1.</b> {formData.socialSecurity.company_donation1}
                </p>
                <p>
                  <b>2.</b> {formData.socialSecurity.company_donation2}
                </p>
                <p>
                  <b>3.</b> {formData.socialSecurity.company_donation3}
                </p>
              </>
            }
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
            <p>
              <b>Photo with ID Card:</b> {formData.photoIdCard ? formData.photoIdCard.name : ''}
            </p>
            <p>
              <b>Bank book:</b> {formData.bankBook ? formData.bankBook.name : ''}
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

export default ConfirmInfoRegisterEmployee;
