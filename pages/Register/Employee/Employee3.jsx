import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register3Employee = ({ onNext }) => {

  const [formData, setFormData] = useState({
    idAddress: '',
    currentAddress: '',
    email: '',
    phoneNumber: '',
    position: '',
    client: '',
    socialSecurity: {
      selfPay: true,
      companyPay: false,
      pnd3: false,
      pnd53: false,
      vat7: false,
      type: '',
      companyName: '',
      registrationNumber: '',
      registrationAddress: '',
      joiningDate: '',
      hospitalMember: '',
      changeHospital: false,
      changeHospita_1: '',
      changeHospita_2: '',
      changeHospita_3: '',
      taxDetails: '',
      withholdingTax: '',
      marriedFullName: '',
      children: '',
      father: false,
      mother: false,
      fatherInLaw: false,
      motherInLaw: false,
      disabledPerson: '',
      lifeInsurance: '',
      healthInsurance: '',
      parentsLifeInsurance: '',
      annuityInsurance: '',
      rmf: '',
      ssf: '',
      providentFund: '',
      donation1: '',
      donation2: '',
      donation3: '',
    },

  });

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    // Call the onNext callback function with the form data
    onNext(formData);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'selfPay' && checked) {
      // Uncheck selfPay and check companyPay
      setFormData((prevData) => ({
        ...prevData,
        socialSecurity: {
          ...prevData.socialSecurity,
          selfPay: true,
          companyPay: false,
        }, //
      }));
    } else if (name === 'companyPay' && checked) {
      // Uncheck companyPay and check selfPay
      setFormData((prevData) => ({
        ...prevData,
        socialSecurity: {
          ...prevData.socialSecurity,
          selfPay: false,
          companyPay: true,
        },
      }));
    } else {
      // For other checkboxes, update their values while keeping selfPay unchanged
      setFormData((prevData) => ({
        ...prevData,
        socialSecurity: {
          ...prevData.socialSecurity,
          [name]: checked,
        },
      }));
    }
  };



  return (
    <div>
      <br />
      <Form className={styles.custom_form} onSubmit={handleSubmit}>
        <br />
        <h5 className={`text-start ${styles.custom_form_group}`}>Social security fund detail</h5>
        <h5 className={`text-start ${styles.custom_form_group}`}>SSF Detail</h5>

        <p className={`text-start ${styles.custom_form_group} mt-4`}>Payment by</p>
        <Form.Group className={styles.custom_form_group} controlId="paymentType">
          <Form.Check
            inline
            label="Self-pay"
            type="checkbox"
            name="selfPay"
            checked={formData.socialSecurity.selfPay}
            onChange={handleCheckboxChange}
          />

          <Form.Check
            inline
            label="Company-pay"
            type="checkbox"
            name="companyPay"
            checked={formData.socialSecurity.companyPay}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        {formData.socialSecurity.selfPay && (
          <>
            <Form.Group className={styles.custom_form_group} controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.socialSecurity.type}
                onChange={handleCheckboxChange}
              >
                <option value="" disabled>Select type</option>
                <option value="M.39">M.39</option>
                <option value="M.40">M.40</option>
              </Form.Control>
            </Form.Group>

            <h5 className={`text-start ${styles.custom_form_group} mt-4`}>Tax Detail</h5>
            <p className={`text-start ${styles.custom_form_group}`}>For non-ssf payment. your tax will be deducted with below chosen type</p>
            <Form.Group className={styles.custom_form_group} controlId="pnd3">
              <Form.Check
                inline
                label="P.N.D 3"
                type="checkbox"
                name="pnd3"
                checked={formData.socialSecurity.pnd3}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="vat7">
              <Form.Check
                inline
                label="VAT 7%"
                type="checkbox"
                name="vat7"
                checked={formData.socialSecurity.vat7}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="pnd53">
              < Form.Check
                inline
                label="P.N.D 53"
                type="checkbox"
                name="pnd53"
                checked={formData.socialSecurity.pnd53}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.socialSecurity.companyName}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="registrationNumber">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration Number"
                name="registrationNumber"
                value={formData.socialSecurity.registrationNumber}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="registrationAddress">
              <Form.Label>Registration Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration Address"
                name="registrationAddress"
                value={formData.socialSecurity.registrationAddress}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </>
        )}

        {formData.socialSecurity.companyPay && (
          <>
            <Form.Group className={styles.custom_form_group} controlId="joiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={formData.socialSecurityjoiningDate}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <p className={styles.custom_form_group}>Hospital</p>

            <Form.Group className={styles.custom_form_group} controlId="hospitalMember">
              <Form.Check
                inline
                label="Member with"
                type="checkbox"
                name="hospitalMember"
                checked={formData.socialSecurityhospitalMember}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="hospital">
              <Form.Control
                type="text"
                name="hospital"
                placeholder="Hospital Name"
                value={formData.socialSecurityhospital}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="changeHospital">
              <Form.Check
                inline
                label="Change Hospital/Non-member"
                type="checkbox"
                name="changeHospital"
                checked={formData.socialSecurity.changeHospital}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            {/* Additional hospital information fields */}
            {formData.socialSecurity.changeHospital && (
              <>
                <Form.Group className={styles.custom_form_group} controlId="changeHospita_1">
                  <Form.Control
                    type="text"
                    placeholder="1."
                    name="changeHospita_1"
                    value={formData.socialSecurity.hospitalName}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>

                <Form.Group className={styles.custom_form_group} controlId="changeHospita_2">
                  <Form.Control
                    type="text"
                    placeholder="2."
                    name="changeHospita_2"
                    value={formData.socialSecurity.hospitalAddress}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>

                <Form.Group className={styles.custom_form_group} controlId="changeHospita_3">
                  <Form.Control
                    type="text"
                    placeholder="3."
                    name="changeHospita_3"
                    value={formData.socialSecurity.hospitalContact}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </>
            )}


            <h5 className={`text-start ${styles.custom_form_group} mt-5`}>TAX Detail</h5>

            <Form.Group className={styles.custom_form_group} controlId="taxDetails">
              <Form.Label>Income before joining</Form.Label>
              <Form.Control
                type="number"
                placeholder="Income before joining"
                name="incomeBeforeJoining"
                value={formData.socialSecurity.incomeBeforeJoining}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="withholdingTax">
              <Form.Label>Withholding tax before joining</Form.Label>
              <Form.Control
                type="number"
                placeholder="Withholding tax before joining"
                name="withholdingTaxBeforeJoining"
                value={formData.socialSecurity.withholdingTaxBeforeJoining}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="marriedFullName">
              <Form.Label>Married Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Married Full Name"
                name="marriedFullName"
                value={formData.socialSecurity.marriedFullName}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="children">
              <Form.Label>Children (Age 1-20 years, Born after year 2018)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Children"
                name="children"
                value={formData.socialSecurity.children}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <p className={styles.custom_form_group}>Parents</p>
            <Form.Group className={styles.custom_form_group} controlId="parents">
              <Form.Check
                inline
                label="Father"
                type="checkbox"
                name="father"
                checked={formData.socialSecurity.father}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                inline
                label="Mother"
                type="checkbox"
                name="mother"
                checked={formData.socialSecurity.mother}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                inline
                label="Father in law"
                type="checkbox"
                name="fatherInLaw"
                checked={formData.socialSecurity.fatherInLaw}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                inline
                label="Mother in law"
                type="checkbox"
                name="motherInLaw"
                checked={formData.socialSecurity.motherInLaw}
                onChange={handleCheckboxChange}
              />

            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="disabledPerson">
              <Form.Label>Disabled Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Disabled Person"
                name="disabledPerson"
                value={formData.socialSecurity.disabledPerson}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="lifeInsurance">
              <Form.Label>Life insurance and Endowment (100,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Life insurance and Endowment (100,000 THB)"
                name="lifeInsurance"
                value={formData.socialSecurity.lifeInsurance}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="healthInsurance">
              <Form.Label>Health insurance / Accident (25,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Health insurance / Accident (25,000 THB)"
                name="healthInsurance"
                value={formData.socialSecurity.healthInsurance}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="parentsLifeInsurance">
              <Form.Label>Parents life insurance (15,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parents life insurance (15,000 THB)"
                name="parentsLifeInsurance"
                value={formData.socialSecurity.parentsLifeInsurance}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="annuityInsurance">
              <Form.Label>Annuity insurance (15% of income / 200,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Annuity insurance (15% of income / 200,000 THB)"
                name="annuityInsurance"
                value={formData.socialSecurity.annuityInsurance}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="rmf">
              <Form.Label>RMF (30% of Net income / 500,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="RMF (30% of Net income / 500,000 THB)"
                name="rmf"
                value={formData.socialSecurity.rmf}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="ssf">
              <Form.Label>SSF Super saving fund (30% of Net income / 200,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="SSF Super saving fund (30% of Net income / 200,000 THB)"
                name="ssf"
                value={formData.socialSecurity.ssf}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="providentFund">
              <Form.Label>Provident fund PVD (15% of Net income / 500,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Provident fund PVD (15% of Net income / 500,000 THB)"
                name="providentFund"
                value={formData.socialSecurity.providentFund}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="donation1">
              <Form.Label>Donation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Donation 1"
                name="donation1"
                value={formData.socialSecurity.donation1}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="donation2">
              <Form.Control
                type="text"
                placeholder="Donation 2"
                name="donation2"
                value={formData.socialSecurity.donation2}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="donation3">
              <Form.Control
                type="text"
                placeholder="Donation 3"
                name="donation3"
                value={formData.socialSecurity.donation3}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </>
        )}




        <Form.Group className={styles.custom_button}>
          <Button className="primary col-12" type="submit">
            Next
          </Button>
        </Form.Group>
      </Form>
    </div>
  );

};

export default Register3Employee;