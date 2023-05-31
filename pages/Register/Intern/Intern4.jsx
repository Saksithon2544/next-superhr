import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register4Intern = ({ onNext, formData, setFormData }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    onNext(true); // Pass formDataObj to the onNext callback
   
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    // Check the file type
    if (selectedFile && !isValidFileType(selectedFile)) {
      // Display error notification with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Please select a valid file type (.pdf, .png, .jpg).',
      });
      return;
    }

    console.log(name, selectedFile)

    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedFile,
    }));

    console.log(formData)
  };

  const isValidFileType = (file) => {
    const allowedTypes = ['.pdf', '.png', '.jpg'];
    const fileType = `.${file.name.split('.').pop()}`;
    return allowedTypes.includes(fileType);
  };

  return (
    <div>
      <br />
      <Form className={styles.custom_form} onSubmit={handleSubmit}>
        <br />
        <h5 className={`${styles.custom_form_group} text-start`}>Please upload your documents</h5>
        <p className={`${styles.custom_form_group} text-danger`}>file should be png, jpg or pdf.</p>
        <br />

        <Form.Group className={styles.custom_form_group} controlId="resumeCv">
          <Form.Label>Resume / CV<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="resumeCv"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="coverLetter">
          <Form.Label>Cover Letter<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="coverLetter"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="transcript">
          <Form.Label>Transcript<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="transcript"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="certificate">
          <Form.Label>Certificate (optional)</Form.Label>
          <Form.Control
            type="file"
            multiple
            name="certificate"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="houseRegistration">
          <Form.Label>House Registration<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="houseRegistration"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="idCard">
          <Form.Label>ID Card<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="idCard"
            accept=".pdf,.png,.jpg"
            onChange={handleChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="photoPersonal">
          <Form.Label>Photo (Personal)<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="file"
            multiple
            name="photoPersonal"
            accept=".pdf,.png,.jpg"
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

export default Register4Intern;
