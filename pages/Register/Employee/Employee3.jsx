import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// CSS
import styles from './RegisterEmployee.module.css';

const Employee3 = ({ onNext, FormData, setFormData }) => {

  const [FormData2, setFormData2] = useState({
    socialSecurity: {
      paymentType: '',
      self_type: '',
      self_textDetails: '',
      self_companyName: '',
      self_registrationNumber: '',
      self_registrationAddress: '',

      company_joiningDate: '',
      company_hospital: '',
      company_hospitalMember_1: '',
      company_changeHospita_1: '',
      company_changeHospita_2: '',
      company_changeHospita_3: '',
      company_incomeBeforeJoining: '',
      company_withholdingTaxBeforeJoining: '',
      company_marriedFullName: '',
      company_children: [
        { name: '', bornAfterYear: '' },
        { name: '', bornAfterYear: '' },
        { name: '', bornAfterYear: '' }
      ],
      company_parents: '',
      company_disabledPerson: '',
      company_lifeInsurance: '',
      company_healthInsurance: '',
      company_parentsLifeInsurance: '',
      company_annuityInsurance: '',
      company_rmf: '',
      company_ssf: '',
      company_providentFund: '',
      company_donation1: '',
      company_donation2: '',
      company_donation3: '',
    },

  });

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setFormData({ ...FormData, ...FormData2 });
    onNext();
  };

  const handleCheckpaymentTypeChange = (e) => {
    const { name } = e.target;
    if (e.target.value === "selfPay") {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
            company_joiningDate: '',
            company_hospital: '',
            company_hospitalMember_1: '',
            company_changeHospita_1: '',
            company_changeHospita_2: '',
            company_changeHospita_3: '',
            company_incomeBeforeJoining: '',
            company_withholdingTaxBeforeJoining: '',
            company_marriedFullName: '',
            company_children: [
              { name: '', bornAfterYear: '' },
              { name: '', bornAfterYear: '' },
              { name: '', bornAfterYear: '' }
            ],
            company_disabledPerson: '',
            company_lifeInsurance: '',
            company_healthInsurance: '',
            company_parentsLifeInsurance: '',
            company_annuityInsurance: '',
            company_rmf: '',
            company_ssf: '',
            company_providentFund: '',
            company_donation1: '',
            company_donation2: '',
            company_donation3: '',
          }
        };
      });
    } else if (e.target.value === "companyPay") {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
            self_textDetails: '',
            self_type: '',
            self_companyName: '',
            self_registrationNumber: '',
            self_registrationAddress: '',
          }
        };
      });
    } else {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
          }
        };
      });
    }
  };


  const handleCheckcompany_hospita = (e) => {
    const { name } = e.target;
    if (e.target.value === "true") {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
            self_textDetails: '',
            self_type: '',
            self_companyName: '',
            self_registrationNumber: '',
            self_registrationAddress: '',
          }
        };
      });
    } else if (e.target.value === "false") {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
            company_hospitalMember_1: '',
            company_changeHospita_1: '',
            company_changeHospita_2: '',
            company_changeHospita_3: '',
          }
        };
      });
    } else {
      setFormData2(prevFormData2 => {
        return {
          ...prevFormData2,
          socialSecurity: {
            ...prevFormData2.socialSecurity,
            [name]: e.target.value,
          }
        };
      });
    }
  };

  const handleChildNameChange = (event, index) => {
    const { value } = event.target;
    setFormData2(prevFormData2 => {
      const updatedChildren = [...prevFormData2.socialSecurity.company_children];
      updatedChildren[index].name = value;
      return {
        ...prevFormData2,
        socialSecurity: {
          ...prevFormData2.socialSecurity,
          company_children: updatedChildren
        }
      };
    });
  };

  const handleBornAfterYearChange = (event, index) => {
    const { value } = event.target;
    setFormData2(prevFormData2 => {
      const updatedChildren = [...prevFormData2.socialSecurity.company_children];
      updatedChildren[index].bornAfterYear = value;
      return {
        ...prevFormData2,
        socialSecurity: {
          ...prevFormData2.socialSecurity,
          company_children: updatedChildren
        }
      };
    });
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
            type="radio"
            name="paymentType"
            value={"selfPay"}
            onChange={handleCheckpaymentTypeChange}
          />

          <Form.Check
            inline
            label="Company-pay"
            type="radio"
            name="paymentType"
            value={"companyPay"}
            onChange={handleCheckpaymentTypeChange}
          />
        </Form.Group>

        {/* // self pay form */}
        {FormData2.socialSecurity && FormData2.socialSecurity.paymentType === "selfPay" &&
          <>
            <Form.Group className={styles.custom_form_group} controlId="self_type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="self_type"
                value={FormData2.socialSecurity.self_type}
                onChange={handleCheckpaymentTypeChange}
              >
                <option value="" disabled>Select type</option>
                <option value="M.39">M.39</option>
                <option value="M.40">M.40</option>
              </Form.Control>
            </Form.Group>

            <h5 className={`text-start ${styles.custom_form_group} mt-4`}>Tax Detail</h5>
            <p className={`text-start ${styles.custom_form_group}`}>For non-ssf payment. your tax will be deducted with below chosen type</p>
            <Form.Group className={styles.custom_form_group} controlId="self_textDetails">
              <Form.Check
                inline
                label="P.N.D 3"
                type="radio"
                name="self_textDetails"
                value={"P.N.D 3"}
                onChange={handleCheckpaymentTypeChange}
              />

              <Form.Check
                inline
                label="VAT 7%"
                type="radio"
                name="self_textDetails"
                value={"VAT 7%"}
                onChange={handleCheckpaymentTypeChange}
              />

              < Form.Check
                inline
                label="P.N.D 53"
                type="radio"
                name="self_textDetails"
                value={"P.N.D 53"}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="self_companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="self_companyName"
                value={FormData2.socialSecurity.self_companyName}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="self_registrationNumber">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration Number"
                name="self_registrationNumber"
                value={FormData2.socialSecurity.self_registrationNumber}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="self_registrationAddress">
              <Form.Label>Registration Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration Address"
                name="self_registrationAddress"
                value={FormData2.socialSecurity.self_registrationAddress}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>
          </>
        }

        {/* // company pay form */}
        {FormData2.socialSecurity && FormData2.socialSecurity.paymentType === "companyPay" &&
          <>
            <Form.Group className={styles.custom_form_group} controlId="company_joiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="company_joiningDate"
                value={FormData2.socialSecurity.company_joiningDate}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <p className={styles.custom_form_group}>Hospital</p>

            <Form.Group className={styles.custom_form_group} controlId="company_hospital">
              <Form.Check
                inline
                label="Member with"
                type="radio"
                name="company_hospital"
                value={"hospitalMember"}
                onChange={handleCheckcompany_hospita}
              />

              <Form.Check
                inline
                label="Change Hospital/Non-member"
                type="radio"
                name="company_hospital"
                value={"changeHospital"}
                onChange={handleCheckcompany_hospita}
              />
            </Form.Group>

            {FormData2.socialSecurity.company_hospital === "hospitalMember" && (
              <>
                <Form.Group className={styles.custom_form_group} controlId="company_hospitalMember_1">
                  <Form.Control
                    type="text"
                    placeholder="Hospital Name"
                    name="company_hospitalMember_1"
                    value={FormData2.socialSecurity.company_hospitalMember_1}
                    onChange={handleCheckcompany_hospita}
                  />
                </Form.Group>
              </>
            )}

            {FormData2.socialSecurity.company_hospital === "changeHospital" && (
              <>
                <Form.Group className={styles.custom_form_group} controlId="company_changeHospita_1">
                  <Form.Control
                    type="text"
                    placeholder="1."
                    name="company_changeHospita_1"
                    value={FormData2.socialSecurity.company_changeHospita_1}
                    onChange={handleCheckcompany_hospita}
                  />
                </Form.Group>

                <Form.Group className={styles.custom_form_group} controlId="company_changeHospita_2">
                  <Form.Control
                    type="text"
                    placeholder="2."
                    name="company_changeHospita_2"
                    value={FormData2.socialSecurity.company_changeHospita_2}
                    onChange={handleCheckcompany_hospita}
                  />
                </Form.Group>

                <Form.Group className={styles.custom_form_group} controlId="company_changeHospita_3">
                  <Form.Control
                    type="text"
                    placeholder="3."
                    name="company_changeHospita_3"
                    value={FormData2.socialSecurity.company_changeHospita_3}
                    onChange={handleCheckcompany_hospita}
                  />
                </Form.Group>
              </>
            )}


            <h5 className={`text-start ${styles.custom_form_group} mt-5`}>TAX Detail</h5>

            <Form.Group className={styles.custom_form_group} controlId="company_incomeBeforeJoining">
              <Form.Label>Income before joining</Form.Label>
              <Form.Control
                type="number"
                placeholder="Income before joining"
                name="company_incomeBeforeJoining"
                value={FormData2.socialSecurity.company_incomeBeforeJoining}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_withholdingTaxBeforeJoining">
              <Form.Label>Withholding tax before joining</Form.Label>
              <Form.Control
                type="number"
                placeholder="Withholding tax before joining"
                name="company_withholdingTaxBeforeJoining"
                value={FormData2.socialSecurity.company_withholdingTaxBeforeJoining}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_marriedFullName">
              <Form.Label>Married Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Married Full Name"
                name="company_marriedFullName"
                value={FormData2.socialSecurity.company_marriedFullName}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            {/* Child 1 */}
            <Form.Group className={`${styles.custom_form_group}`} controlId="company_child1">
              <Form.Label>Children (Age 1-20 years, Born after year 2018)</Form.Label>
              <Form.Control
                type="text"
                placeholder="First child's name"
                name="company_child1"
                value={FormData2.socialSecurity.company_children[0].name}
                onChange={event => handleChildNameChange(event, 0)}
              />
              <Form.Check
                inline
                type="radio"
                label="Before"
                name={`bornYear-${0}`}
                value="Before"
                checked={FormData2.socialSecurity.company_children[0].bornAfterYear === "Before"}
                onChange={event => handleBornAfterYearChange(event, 0)}
              />
              <Form.Check
                inline
                type="radio"
                label="After"
                name={`bornYear-${0}`}
                value="After"
                checked={FormData2.socialSecurity.company_children[0].bornAfterYear === "After"}
                onChange={event => handleBornAfterYearChange(event, 0)}
              />
            </Form.Group>

            {/* Child 2 */}
            <Form.Group className={styles.custom_form_group} controlId="company_child2">
              <Form.Control
                type="text"
                placeholder="Second child's name"
                name="company_child2"
                value={FormData2.socialSecurity.company_children[1].name}
                onChange={event => handleChildNameChange(event, 1)}
              />
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Before"
                  name={`bornYear-${1}`}
                  value="Before"
                  checked={FormData2.socialSecurity.company_children[1].bornAfterYear === "Before"}
                  onChange={event => handleBornAfterYearChange(event, 1)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="After"
                  name={`bornYear-${1}`}
                  value="After"
                  checked={FormData2.socialSecurity.company_children[1].bornAfterYear === "After"}
                  onChange={event => handleBornAfterYearChange(event, 1)}
                />
              </div>
            </Form.Group>

            {/* Child 3 */}
            <Form.Group className={styles.custom_form_group} controlId="company_child3">
              <Form.Control
                type="text"
                placeholder="Third child's name"
                name="company_child3"
                value={FormData2.socialSecurity.company_children[2].name}
                onChange={event => handleChildNameChange(event, 2)}
              />
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Before"
                  name={`bornYear-${2}`}
                  value="Before"
                  checked={FormData2.socialSecurity.company_children[2].bornAfterYear === "Before"}
                  onChange={event => handleBornAfterYearChange(event, 2)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="After"
                  name={`bornYear-${2}`}
                  value="After"
                  checked={FormData2.socialSecurity.company_children[2].bornAfterYear === "After"}
                  onChange={event => handleBornAfterYearChange(event, 2)}
                />
              </div>
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_parents">
              <Form.Label>Parents<span className="text-danger"> *</span></Form.Label> <br />
              <Form.Check inline label="Father" type="radio" name="company_parents" value={"Father"}  onChange={handleCheckpaymentTypeChange}/>
              <Form.Check inline label="Mother" type="radio" name="company_parents" value={"Mother"}  onChange={handleCheckpaymentTypeChange}/>
              <Form.Check inline label="Father in law" type="radio" name="company_parents" value={"Father in law"}  onChange={handleCheckpaymentTypeChange}/>
              <Form.Check inline label="Mother in law" type="radio" name="company_parents" value={"Mother in law"}  onChange={handleCheckpaymentTypeChange}/>
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_disabledPerson">
              <Form.Label>Disabled Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Disabled Person"
                name="company_disabledPerson"
                value={FormData2.socialSecurity.company_disabledPerson}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_lifeInsurance">
              <Form.Label>Life insurance and Endowment (100,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Life insurance and Endowment (100,000 THB)"
                name="company_lifeInsurance"
                value={FormData2.socialSecurity.company_lifeInsurance}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_healthInsurance">
              <Form.Label>Health insurance / Accident (25,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Health insurance / Accident (25,000 THB)"
                name="company_healthInsurance"
                value={FormData2.socialSecurity.company_healthInsurance}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_parentsLifeInsurance">
              <Form.Label>Parents life insurance (15,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parents life insurance (15,000 THB)"
                name="company_parentsLifeInsurance"
                value={FormData2.socialSecurity.company_parentsLifeInsurance}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_annuityInsurance">
              <Form.Label>Annuity insurance (15% of income / 200,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Annuity insurance (15% of income / 200,000 THB)"
                name="company_annuityInsurance"
                value={FormData2.socialSecurity.company_annuityInsurance}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_rmf">
              <Form.Label>RMF (30% of Net income / 500,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="RMF (30% of Net income / 500,000 THB)"
                name="company_rmf"
                value={FormData2.socialSecurity.company_rmf}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_ssf">
              <Form.Label>SSF Super saving fund (30% of Net income / 200,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="SSF Super saving fund (30% of Net income / 200,000 THB)"
                name="company_ssf"
                value={FormData2.socialSecurity.company_ssf}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_providentFund">
              <Form.Label>Provident fund PVD (15% of Net income / 500,000 THB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Provident fund PVD (15% of Net income / 500,000 THB)"
                name="company_providentFund"
                value={FormData2.socialSecurity.company_providentFund}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_donation1">
              <Form.Label>Donation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Donation 1"
                name="company_donation1"
                value={FormData2.socialSecurity.company_donation1}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_donation2">
              <Form.Control
                type="text"
                placeholder="Donation 2"
                name="company_donation2"
                value={FormData2.socialSecurity.company_donation2}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>

            <Form.Group className={styles.custom_form_group} controlId="company_donation3">
              <Form.Control
                type="text"
                placeholder="Donation 3"
                name="company_donation3"
                value={FormData2.socialSecurity.company_donation3}
                onChange={handleCheckpaymentTypeChange}
              />
            </Form.Group>
          </>
        }

        <Form.Group className={styles.custom_button}>
          <Button className="primary col-12" type="submit">
            Next
          </Button>
        </Form.Group>
      </Form>
    </div >
  );

};

export default Employee3;