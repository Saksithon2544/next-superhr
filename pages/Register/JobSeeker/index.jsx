import React, { useState, useEffect } from 'react';
import { Button, Form, Container, ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

// CSS
import styles from './RegisterJobSeeker.module.css';

// Components
import JobSeeker2 from './JobSeeker2';
import JobSeeker3 from './JobSeeker3';
import JobSeeker4 from './JobSeeker4';
import ConfirmInfo from '../../ConfirmInfoRegister/JobSeeker';

function RegisterJobSeeker() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});

  const router = useRouter();

  const onSubmit = (data) => {
    const showErrorAndNotify = (fieldName, message) => {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        html: `${message}`,
      });
    };

    const validateField = (fieldName, label) => {
      if (!data[fieldName]) {
        showErrorAndNotify(label, `This <span style="color:red">${label}</span> is required`);
        return false;
      } else if (!/^[\p{Letter}\sก-๙เแะโใไ]+$/u.test(data[fieldName])) {
        showErrorAndNotify(label, `This <span style="color:red">${label}</span> should contain letters only`);
        return false;
      }
      return true;
    };

    const validateRequiredFields = () => {
      const requiredFields = [
        { fieldName: 'prefix', label: 'Prefix' },
        { fieldName: 'fullNameThai', label: 'Full Name (Thai)' },
        { fieldName: 'fullNameEng', label: 'Full Name (English)' },
        { fieldName: 'gender', label: 'Gender' },
      ];

      for (const field of requiredFields) {
        const isValid = validateField(field.fieldName, field.label);
        if (!isValid) {
          return;
        }
      }

      // ตรวจสอบฟิลด์ที่จำเป็นทั้งหมดและแจ้งเตือนผู้ใช้เมื่อมีข้อผิดพลาด
      const isAllFieldsValid = requiredFields.every((field) => validateField(field.fieldName, field.label));
      if (!isAllFieldsValid) {
        return;
      }

      nextStep();
    };

    const { username, email } = router.query;
    setFormData({ ...data, fileNames: Object.keys(data), username, email }); // Add fileNames to formData

    validateRequiredFields();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const nationalities = data.map((item) => {
          return {
            name: item.name.common,
            code: item.cca2,
          };
        });
        setNationalities(nationalities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNationalities();
  }, []);


  return (
    <Container>
      <div style={{ margin: '50px' }}>
        <h2 className="text-start">Register</h2>
        <ProgressBar now={(step / 5) * 100} />

        {step === 1 && (
          <div>
            <br />
            <Form className={styles.custom_form} onSubmit={handleSubmit(onSubmit)}>
              <br />
              <h5 className={`text-start ${styles.custom_form_group}`}>Personal details</h5>
              <Form.Group className={styles.custom_form_group} controlId="prefix">
                <Form.Label>Prefix<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Prefix" {...register('prefix')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="fullNameThai">
                <Form.Label>Full name (Thai name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Thai name" {...register('fullNameThai')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="fullNameEng">
                <Form.Label>Full name (English name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="English name" {...register('fullNameEng')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="idNumber">
                <Form.Label>ID number/ID Passport</Form.Label>
                <Form.Control type="text" placeholder="ID number/ID Passport" {...register('idNumber')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="gender">
                <Form.Label>Gender<span className="text-danger"> *</span></Form.Label> <br />
                <Form.Check inline label="Female" type="radio" name="gender" value={"Female"} {...register('gender')} />
                <Form.Check inline label="Male" type="radio" name="gender" value={"Male"} {...register('gender')} />
                <Form.Check inline label="LGBTQIA+" type="radio" name="gender" value={"LGBTQIA+"} {...register('gender')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="birthday">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type="date" placeholder="DD/MM/YYYY"/>
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="maritalStatus">
                <Form.Label>Marital status</Form.Label> <br />
                <Form.Check inline label="Single" type="radio" name="maritalStatus" value={"Single"} {...register('maritalStatus')} />
                <Form.Check inline label="Married" type="radio" name="maritalStatus" value={"Married"} {...register('maritalStatus')} />
                <Form.Check inline label="Divorced" type="radio" name="maritalStatus" value={"Divorced"} {...register('maritalStatus')} />
                <Form.Check inline label="Widowed" type="radio" name="maritalStatus" value={"Widowed"} {...register('maritalStatus')} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control as="select" defaultValue={""} {...register('religion')}>
                  <option value={""} disabled>Select religion</option>
                  <option value={"Buddhism"}>Buddhism</option>
                  <option value={"Christianity"}>Christianity</option>
                  <option value={"Hinduism"}>Hinduism</option>
                  <option value={"Islam"}>Islam</option>
                  <option value={"Judaism"}>Judaism</option>
                  <option value={"Sikhism"}>Sikhism</option>
                  <option value={"Other"}>Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control as="select" defaultValue={""} {...register('nationality')}>
                  <option value="" disabled>Select nationality</option>
                  {nationalities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((nationality, index) => (
                      <option key={index} value={nationality.name}>
                        {nationality.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group className={styles.custom_button}>
                <Button className="primary col-12" type="submit">
                  Next
                </Button>
              </Form.Group>
            </Form>
          </div>
        )}

        {step === 2 && (
          <div>
            <JobSeeker2 onNext={nextStep} formData={formData} setFormData={setFormData} />
          </div>
        )}

        {step === 3 && (
          <div>
            <JobSeeker3 onNext={nextStep} formData={formData} setFormData={setFormData} />
          </div>
        )}

        {step === 4 && (
          <div>
            <JobSeeker4 onNext={nextStep} formData={formData} fileNames={formData.fileNames} setFormData={setFormData} />
          </div>
        )}

        {step === 5 && (
          <div>
            <ConfirmInfo formData={formData} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default RegisterJobSeeker;
