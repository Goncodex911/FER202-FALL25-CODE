import React, { useEffect, useReducer } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { usePaymentContext } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const initial = {
  semester: '',
  course: '',
  amount: '',
  date: '',
  errors: {},
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors || {} };
    case 'LOAD':
      return { ...state, ...action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    default:
      return state;
  }
}

const AddPayment = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = mode === 'edit' || Boolean(params.id);
  const id = params.id;

  const { user } = useAuth();
  const { addPayment, updatePayment, getPaymentById } = usePaymentContext();
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    if (isEdit && id) {
      const p = getPaymentById(id);
      if (p) {
        dispatch({ type: 'LOAD', payload: {
          semester: p.semester || '',
          course: p.course || '',
          amount: String(p.amount ?? ''),
          date: p.date || '',
        }});
      }
    }
  }, [isEdit, id, getPaymentById]);

  const validate = () => {
    const e = {};
    if (!state.semester.trim()) e.semester = 'Semester is required';
    if (!state.course.trim()) e.course = 'Course is required';
    if (!state.amount || isNaN(Number(state.amount)) || Number(state.amount) <= 0) e.amount = 'Amount must be > 0';
    if (!state.date) e.date = 'Date is required';
    return e;
    };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    dispatch({ type: 'SET_ERRORS', errors: e });
    if (Object.keys(e).length) return;

    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const payload = {
        userId: user?.id ?? 1,
        semester: state.semester.trim(),
        course: state.course.trim(),
        amount: Number(state.amount),
        date: state.date,
      };
      if (isEdit && id) {
        await updatePayment(Number(id), payload);
      } else {
        await addPayment(payload);
      }
      navigate('/home');
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <Card>
              <Card.Header as="h5">{isEdit ? 'Edit Payment' : 'Add Payment'}</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      value={state.semester}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'semester', value: e.target.value })}
                      isInvalid={!!state.errors.semester}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.semester}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Course</Form.Label>
                    <Form.Control
                      value={state.course}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'course', value: e.target.value })}
                      isInvalid={!!state.errors.course}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.course}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={state.amount}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'amount', value: e.target.value })}
                      isInvalid={!!state.errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.amount}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={state.date}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })}
                      isInvalid={!!state.errors.date}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.date}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" disabled={state.loading}>
                      {isEdit ? 'Save changes' : 'Create'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddPayment;
