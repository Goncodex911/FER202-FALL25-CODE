import React, { useReducer, useState } from 'react'
import { Card, Form, Button, Row, Col, Alert, InputGroup } from 'react-bootstrap'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  agree: false,
  errors: {},
  touched: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOUCH':
      return { ...state, touched: { ...state.touched, [action.field]: true } }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function validate({ name, email, password, confirm, agree }) {
  const e = {}
  if (!name) e.name = 'Họ tên là bắt buộc'
  if (!email) e.email = 'Email là bắt buộc'
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) e.email = 'Email không hợp lệ'
  if (!password) e.password = 'Mật khẩu là bắt buộc'
  else if (password.length < 6) e.password = 'Mật khẩu tối thiểu 6 ký tự'
  if (confirm !== password) e.confirm = 'Xác nhận mật khẩu không khớp'
  if (!agree) e.agree = 'Bạn phải đồng ý điều khoản'
  return e
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showPwd, setShowPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch({ type: 'SET_FIELD', field: name, value: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(state)
    dispatch({ type: 'SET_ERRORS', errors: errs })
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
      // Thực tế: gọi API đăng ký ở đây
    } else {
      setSubmitted(false)
    }
  }

  return (
    <Card>
      <Card.Header>Exercise 4: SignUpForm (useReducer + useState)</Card.Header>
      <Card.Body>
        {submitted && <Alert variant="success">Đăng ký thành công (demo)!</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  name="name"
                  value={state.name}
                  onChange={onChange}
                  onBlur={() => dispatch({ type: 'TOUCH', field: 'name' })}
                  isInvalid={state.touched.name && !!state.errors.name}
                  placeholder="Nguyễn Văn A"
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onChange}
                  onBlur={() => dispatch({ type: 'TOUCH', field: 'email' })}
                  isInvalid={state.touched.email && !!state.errors.email}
                  placeholder="you@example.com"
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPwd ? 'text' : 'password'}
                    name="password"
                    value={state.password}
                    onChange={onChange}
                    onBlur={() => dispatch({ type: 'TOUCH', field: 'password' })}
                    isInvalid={state.touched.password && !!state.errors.password}
                    placeholder="••••••"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPwd(s => !s)}
                    type="button"
                  >
                    {showPwd ? 'Ẩn' : 'Hiện'}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type={showPwd ? 'text' : 'password'}
                  name="confirm"
                  value={state.confirm}
                  onChange={onChange}
                  onBlur={() => dispatch({ type: 'TOUCH', field: 'confirm' })}
                  isInvalid={state.touched.confirm && !!state.errors.confirm}
                  placeholder="••••••"
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.confirm}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Check
            className="mb-3"
            type="checkbox"
            name="agree"
            checked={state.agree}
            onChange={onChange}
            label="Tôi đồng ý với điều khoản sử dụng"
            isInvalid={state.touched.agree && !!state.errors.agree}
            onBlur={() => dispatch({ type: 'TOUCH', field: 'agree' })}
            feedback={state.errors.agree}
          />

          <div className="d-flex gap-2">
            <Button type="submit">Đăng ký</Button>
            <Button variant="secondary" type="button" onClick={() => dispatch({ type: 'RESET' })}>
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
