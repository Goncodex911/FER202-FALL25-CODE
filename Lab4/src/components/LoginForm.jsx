import React, { useReducer, useState } from 'react'
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap'

const initialState = {
  email: '',
  password: '',
  remember: false,
  errors: {},   // { email?: string, password?: string }
  touched: {}   // { email?: true, password?: true }
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

function validate({ email, password }) {
  const errors = {}
  if (!email) errors.email = 'Email là bắt buộc'
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.email = 'Email không hợp lệ'

  if (!password) errors.password = 'Mật khẩu là bắt buộc'
  else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự'

  return errors
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showPwd, setShowPwd] = useState(false)     // UI state: toggle hiện/ẩn mật khẩu
  const [submitted, setSubmitted] = useState(false) // UI state: hiển thị Alert khi login demo

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
      if (state.remember) localStorage.setItem('rememberEmail', state.email)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <Card>
      <Card.Header>Exercise 3: LoginForm (useReducer + useState)</Card.Header>
      <Card.Body>
        {submitted && <Alert variant="success">Đăng nhập thành công (demo)!</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
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

          <Form.Check
            className="mb-3"
            type="checkbox"
            name="remember"
            checked={state.remember}
            onChange={onChange}
            label="Ghi nhớ email"
          />

          <div className="d-flex gap-2">
            <Button type="submit">Đăng nhập</Button>
            <Button variant="secondary" type="button" onClick={() => dispatch({ type: 'RESET' })}>
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
