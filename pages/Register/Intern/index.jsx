import React, { useState, useEffect } from 'react';
import { Button, Form, Container, ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// Components
import Intern2 from './Intern2';
import Intern3 from './Intern3';
import Intern4 from './Intern4';
import ConfirmInfo from '../../ConfirmInfoRegister/Intern';


// CSS
import styles from './RegisterIntern.module.css';

function RegisterIntern() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});

  const router = useRouter();

  const onSubmit = (data) => {
    // console.log(data);
    const { username, email } = router.query;
    setFormData({ ...data, fileNames: Object.keys(data), username, email }); // Add fileNames to formData
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

        {/* {JSON.stringify(formData)} */}
        {step === 1 && (
          <div>
            <br />
            <Form className={styles.custom_form} onSubmit={handleSubmit(onSubmit)}>
              <br />
              <h5 className={`text-start ${styles.custom_form_group}`}>Personal details</h5>
              <Form.Group className={styles.custom_form_group} controlId="prefix">
                <Form.Label>Prefix<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Mr. / Ms." {...register('prefix', { required: 'This field is required' })} />
                {errors.prefix && <p className="text-danger">{errors.prefix.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="fullNameThai">
                <Form.Label>Full name (Thai name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Thai name" {...register('fullNameThai', { required: 'This field is required' })} />
                {errors.fullNameThai && <p className="text-danger">{errors.fullNameThai.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="fullNameEng">
                <Form.Label>Full name (English name)<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="English name" {...register('fullNameEng', { required: 'This field is required' })} />
                {errors.fullNameEng && <p className="text-danger">{errors.fullNameEng.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="idNumber">
                <Form.Label>ID number/ID Passport<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="ID number/ID Passport" {...register('idNumber', { required: 'This field is required' })} />
                {errors.idNumber && <p className="text-danger">{errors.idNumber.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="gender">
                <Form.Label>Gender<span className="text-danger"> *</span></Form.Label> <br />
                <Form.Check inline label="Female" type="radio" name="gender" value={"Female"} {...register('gender', { required: 'Please select a gender' })} />
                <Form.Check inline label="Male" type="radio" name="gender" value={"Male"} {...register('gender', { required: 'Please select a gender' })} />
                <Form.Check inline label="LGBTQIA+" type="radio" name="gender" value={"LGBTQIA+"} {...register('gender', { required: 'Please select a gender' })} />
                {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
              </Form.Group>


              <Form.Group className={styles.custom_form_group} controlId="birthday">
                <Form.Label>Date of birth<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="date" placeholder="DD/MM/YYYY"  {...register('birthday', { required: 'This field is required' })} />
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="maritalStatus">
                <Form.Label>Marital status<span className="text-danger"> *</span></Form.Label> <br />
                <Form.Check inline label="Single" type="radio" name="maritalStatus" value={"Single"} {...register('maritalStatus', { required: 'Please select a maritalStatus' })} />
                <Form.Check inline label="Married" type="radio" name="maritalStatus" value={"Married"} {...register('maritalStatus', { required: 'Please select a maritalStatus' })} />
                <Form.Check inline label="Divorced" type="radio" name="maritalStatus" value={"Divorced"} {...register('maritalStatus', { required: 'Please select a maritalStatus' })} />
                <Form.Check inline label="Widowed" type="radio" name="maritalStatus" value={"Widowed"} {...register('maritalStatus', { required: 'Please select a maritalStatus' })} />
                {errors.maritalStatus && <p className="text-danger">{errors.maritalStatus.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control as="select" defaultValue={""} {...register('religion', { required: 'Please select a religion' })}>
                  <option value={""} disabled>Select religion</option>
                  <option value={"Buddhism"}>Buddhism</option>
                  <option value={"Christianity"}>Christianity</option>
                  <option value={"Hinduism"}>Hinduism</option>
                  <option value={"Islam"}>Islam</option>
                  <option value={"Judaism"}>Judaism</option>
                  <option value={"Sikhism"}>Sikhism</option>
                  <option value={"Other"}>Other</option>
                </Form.Control>
                {errors.religion && <p className="text-danger">{errors.religion.message}</p>}
              </Form.Group>

              <Form.Group className={styles.custom_form_group} controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control as="select" defaultValue={""} {...register('nationality', { required: 'Please select a nationality' })}>
                  <option value="" disabled>Select nationality</option>
                  {nationalities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((nationality, index) => (
                      <option key={index} value={nationality.name}>
                        {nationality.name}
                      </option>
                    ))}
                </Form.Control>
                {errors.nationality && <p className="text-danger">{errors.nationality.message}</p>}
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
            <Intern2 onNext={nextStep} formData={formData} setFormData={setFormData} />
          </div>
        )}

        {step === 3 && (
          <div>
            <Intern3 onNext={nextStep} formData={formData} setFormData={setFormData} />
          </div>
        )}

        {step === 4 && (
          <div>
            <Intern4 onNext={nextStep} formData={formData} fileNames={formData.fileNames} setFormData={setFormData} />
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

export default RegisterIntern;
