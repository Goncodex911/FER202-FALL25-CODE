import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col, Modal } from "react-bootstrap";

const initialState = {
  user: { username: "", password: "" },
  errors: {},
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value },
      };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case "CLEAR_ERROR":
      const newErr = { ...state.errors };
      delete newErr[action.field];
      return { ...state, errors: newErr };
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export default function LoginForm2_useReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_USER", field: name, value });
    if (!value.trim()) {
      dispatch({ type: "SET_ERROR", payload: { [name]: `${name} is required` } });
    } else {
      dispatch({ type: "CLEAR_ERROR", field: name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state.user;
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length)
      dispatch({ type: "SET_ERROR", payload: newErrors });
    else dispatch({ type: "SHOW_MODAL" });
  };

  const handleClose = () => dispatch({ type: "RESET" });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">LoginForm2 (useReducer)</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {["username", "password"].map((field) => (
                  <Form.Group key={field} className="mb-3">
                    <Form.Label>{field}</Form.Label>
                    <Form.Control
                      type={field === "password" ? "password" : "text"}
                      name={field}
                      value={state.user[field]}
                      onChange={handleChange}
                      isInvalid={!!state.errors[field]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {state.errors[field]}
                    </Form.Control.Feedback>
                  </Form.Group>
                ))}
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={state.showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Welcome, {state.user.username}!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
