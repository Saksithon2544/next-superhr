import React, { useState, useEffect } from 'react';
import { Button, Form, Container, ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// CSS
import './RegisterJobSeeker.css';

// Components
import JobSeeker2 from './JobSeeker2';
import JobSeeker3 from './JobSeeker3';
import JobSeeker4 from './JobSeeker4';
import ConfirmInfo from '../../ConfirmInfoRegister/JobSeeker';

function RegisterJobSeeker() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    // console.log(data);
    setFormData({ ...data, fileNames: Object.keys(data) }); // Add fileNames to formData
    nextStep();
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
            <Form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
              <br />
              <h5 className="text-start custom-form-group">Personal details</h5>
              <Form.Group className="custom-form-group" controlId="prefix">
                <Form.Label>Prefix<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Mr. / Ms." {...register('prefix')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="fullNameThai">
                <Form.Label>Full name (Thai name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Thai name" {...register('fullNameThai')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="fullNameEng">
                <Form.Label>Full name (English name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="English name" {...register('fullNameEng')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="idNumber">
                <Form.Label>ID number/ID Passport<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="ID number/ID Passport" {...register('idNumber')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="gender">
                <Form.Label>Gender<span className="text-danger"> *</span></Form.Label> <br />
                <Form.Check inline label="Female" type="radio" name="gender" value={"Female"} {...register('gender')} />
                <Form.Check inline label="Male" type="radio" name="gender" value={"Male"} {...register('gender')} />
                <Form.Check inline label="LGBTQIA+" type="radio" name="gender" value={"LGBTQIA+"} {...register('gender')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="birthday">
                <Form.Label>Date of birth<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="date" name="birthday" placeholder="DD/MM/YYYY"  {...register('birthday')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="maritalStatus">
                <Form.Label>Marital status<span className="text-danger"> *</span></Form.Label> <br />
                <Form.Check inline label="Single" type="radio" name="maritalStatus" value={"Single"} {...register('maritalStatus')} />
                <Form.Check inline label="Married" type="radio" name="maritalStatus" value={"Married"} {...register('maritalStatus')} />
                <Form.Check inline label="Divorced" type="radio" name="maritalStatus" value={"Divorced"} {...register('maritalStatus')} />
                <Form.Check inline label="Widowed" type="radio" name="maritalStatus" value={"Widowed"} {...register('maritalStatus')} />
              </Form.Group>

              <Form.Group className="custom-form-group" controlId="religion">
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

              <Form.Group className="custom-form-group" controlId="nationality">
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
              <Form.Group className="custom-button">
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
