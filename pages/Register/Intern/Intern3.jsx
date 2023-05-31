import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register3Intern = ({ onNext, formData, setFormData }) => {
  const [educationData, setEducationData] = useState({
    university: formData?.education?.university || '',
    educationLevel: formData?.education?.educationLevel || '',
    major: formData?.education?.major || '',
    field: formData?.education?.field || '',
    GPA: formData?.education?.GPA || '',
  });

  const [applicationData, setApplicationData] = useState({
    position: formData?.application?.position || '',
    internshipPeriod: formData?.application?.internshipPeriod || '',
    applicationReason: formData?.application?.applicationReason || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      education: educationData,
      application: applicationData,
    };
    // console.log(updatedFormData);
    setFormData({ ...formData, ...updatedFormData });
    onNext();
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <br />
      <Form className={styles.custom_form} onSubmit={handleSubmit}>
        <br />

        {/* Education Section */}
        <h5 className="text-start ${styles.custom_form_group}">Education</h5>
        <Form.Group className={styles.custom_form_group} controlId="university">
          <Form.Label>University<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="University"
            name="university"
            value={educationData.university}
            onChange={handleEducationChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="educationLevel">
          <Form.Label>Education Level<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            as="select"
            name="educationLevel"
            value={educationData.educationLevel}
            onChange={handleEducationChange}
          >
            <option value="" disabled>Select education level</option>
            <option value="1st year">1st year</option>
            <option value="2nd year">2nd year</option>
            <option value="3rd year">3rd year</option>
            <option value="4th year">4th year</option>
            <option value="Other">Other</option>
          </Form.Control>

        </Form.Group>


        <Form.Group className={styles.custom_form_group} controlId="major">
          <Form.Label>Major<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Major"
            name="major"
            value={educationData.major}
            onChange={handleEducationChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="field">
          <Form.Label>Field<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            as={"textarea"}
            placeholder="Field"
            name="field"
            value={educationData.field}
            onChange={handleEducationChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="GPA">
          <Form.Label>GPA<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="GPA"
            name="GPA"
            value={educationData.GPA}
            onChange={handleEducationChange}
          // required
          />
        </Form.Group>

        {/* Application Section */}
        <h5 className={`text-start ${styles.custom_form_group}`}>Application</h5>
        <Form.Group className={styles.custom_form_group} controlId="position">
          <Form.Label>Position<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Position"
            name="position"
            value={applicationData.position}
            onChange={handleApplicationChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="internshipPeriod">
          <Form.Label>Internship Period<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Internship Period"
            name="internshipPeriod"
            value={applicationData.internshipPeriod}
            onChange={handleApplicationChange}
          // required
          />
        </Form.Group>

        <Form.Group className={styles.custom_form_group} controlId="applicationReason">
          <Form.Label>Application Reason<span className="text-danger"> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Application Reason"
            name="applicationReason"
            value={applicationData.applicationReason}
            onChange={handleApplicationChange}
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

export default Register3Intern;
