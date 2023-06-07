import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFrom } from 'react-hook-form';
import Swal from 'sweetalert2';

// CSS
import styles from './RegisterIntern.module.css';


const Register2Intern = ({ onNext, formData, setFormData }) => {
  const [form2Data, setForm2Data] = useState({
    idAddress: '',
    currentAddress: '',
    email: '',
    phoneNumber: '',
    contactPerson: '',
    contactPersonPhoneNumber: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check is required fields empty
    const requiredFields = ['email', 'phoneNumber'];
    const emptyFields = [];
    requiredFields.forEach((field) => {
      if (!form2Data[field]) {
        emptyFields.push(field);
      }
    });
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `The following fields are required: ${emptyFields.join(', ')}`,
      });
      return;
    }
  
    setFormData({ ...formData, ...form2Data });
    onNext();
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
            type="email"
            placeholder="Email"
            name="email"
            value={form2Data.email}
            onChange={handleChange}
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
