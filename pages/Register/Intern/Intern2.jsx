import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

// CSS
import styles from './RegisterIntern.module.css';


const Register2Intern = ({ onNext, formData, setFormData }) => {
  const router = useRouter();

  const [form2Data, setForm2Data] = useState({
    idAddress: '',
    currentAddress: '',
    email: '',
    phoneNumber: '',
    contactPerson: '',
    contactPersonPhoneNumber: '',
  });

  useEffect(() => {
    setForm2Data({
      ...form2Data,
      email: router.query.email,
    })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    const showErrorAndNotify = (fieldName, message) => {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        html: `${message}`,
      });
    };

    const validateField = (fieldName, label, regex, errorMessage) => {
      if (!form2Data[fieldName]) {
        const requiredErrorMessage = `This <span style="color:red">${label}</span> is required`;
        showErrorAndNotify(label, requiredErrorMessage);
        return false;
      }else if (regex && !regex.test(form2Data[fieldName])) {
        showErrorAndNotify(label, errorMessage);
        return false;
      }else if (!/^0[0-9]{9}$/.test(form2Data.contactPersonPhoneNumber) && form2Data.contactPersonPhoneNumber !== '') {
        showErrorAndNotify('contactPersonPhoneNumber', 'Please enter a valid contact person phone number starting with 0 and containing 10 digits');
        return false;
      }

      return true;
    };

    const validateRequiredFields = () => {
      const requiredFields = [
        { fieldName: 'email', label: 'Email', regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, errorMessage: 'Please enter a valid email address in the format example@example.com' },
        { fieldName: 'phoneNumber', label: 'Phone Number', regex: /^0[0-9]{9}$/, errorMessage: 'Please enter a valid phone number starting with 0 and containing 10 digits' },
      ];

      for (const field of requiredFields) {
        const isValid = validateField(field.fieldName, field.label, field.regex, field.errorMessage);
        if (!isValid) {
          return;
        }
      }
      onNext();
    };

    setFormData({ ...formData, ...form2Data });
    validateRequiredFields();
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm2Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <br />
      <Form className={styles.custom_form} onSubmit={handleSubmit}>
        <br />
        <Form.Group className={styles.custom_form_group} controlId="idAddress">
          <Form.Label>ID (House registration) Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID address"
            name="idAddress"
            value={form2Data.idAddress}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="currentAddress">
          <Form.Label>Current Address</Form.Label>
          <Form.Control
            as={"textarea"}
            placeholder="Current address"
            name="currentAddress"
            value={form2Data.currentAddress}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="email">
          <Form.Label>Email<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            value={form2Data.email}
            onChange={handleChange}
            readOnly
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="phoneNumber">
          <Form.Label>Phone Number<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone number"
            name="phoneNumber"
            value={form2Data.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="contactPerson">
          <Form.Label>Contact Person</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact person"
            name="contactPerson"
            value={form2Data.contactPerson}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="contactPersonPhoneNumber">
          <Form.Label>Contact Person Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Contact person phone number"
            name="contactPersonPhoneNumber"
            value={form2Data.contactPersonPhoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <br />
        <Form.Group className={styles.custom_button}>
          <Button className="primary col-12" type="submit">
            Next
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register2Intern;
