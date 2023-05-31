import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register2JobSeeker = ({ onNext, formData, setFormData }) => {
  const [form2Data, setForm2Data] = useState({
    idAddress: '',
    currentAddress: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm2Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, ...form2Data });
    onNext();
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

export default Register2JobSeeker;
