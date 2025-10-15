// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { Container, ProgressBar, Card, Button } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const progress = Math.round(((step - 1) / 2) * 100);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Container className="my-5">
      <Card>
        <Card.Header>
          <h3>Build Your Profile</h3>
          <ProgressBar now={progress} label={`${progress}%`} />
        </Card.Header>
        <Card.Body>
          {step === 1 && <AboutForm />}
          {step === 2 && <AccountForm />}
          {step === 3 && <AddressForm />}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevStep} disabled={step === 1}>Previous</Button>
          {step < 3 ? (
            <Button variant="primary" onClick={nextStep}>Next</Button>
          ) : (
            <Button variant="success">Finish</Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}