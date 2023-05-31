import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
    // console.log(formData);
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
          <Form.Label>ID (House registration) Address<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="ID address"
            name="idAddress"
            value={form2Data.idAddress}
            onChange={handleChange}
            // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="currentAddress">
          <Form.Label>Current Address<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            as={"textarea"}
            placeholder="Current address"
            name="currentAddress"
            value={form2Data.currentAddress}
            onChange={handleChange}
            // required
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
            // required
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
            // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="contactPerson">
          <Form.Label>Contact Person<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact person"
            name="contactPerson"
            value={form2Data.contactPerson}
            onChange={handleChange}
            // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="contactPersonPhoneNumber">
          <Form.Label>Contact Person Phone Number<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="tel"
            placeholder="Contact person phone number"
            name="contactPersonPhoneNumber"
            value={form2Data.contactPersonPhoneNumber}
            onChange={handleChange}
            // required
          />
        </Form.Group>

        <br />
        <Form.Group className="custom-button">
          <Button className="primary col-12" type="submit">
            Next
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register2Intern;
