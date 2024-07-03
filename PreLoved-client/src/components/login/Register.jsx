import React, {useState} from 'react'
import './index.css'
import axios from '../../api/axios'
import {Alert, Col, Form, FormGroup, Row, Stack} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REGISTER_URL = '/api/auth/register'
export const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUsernameChange = event => {
    setUsername(event.target.value)
    if (event.target.value) {
      setUsernameError('')
      setFormError('')
    }
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
    if (event.target.value) {
      setPasswordError('')
      setFormError('')
    }
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
    checkEmail(event.target.value)
  }

  const handleUsernameBlur = () => {
    if (!username) {
      setUsernameError('Username is required')
    }
  }
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required')
    }
  }

  const handleEmailBlur = () => {
    checkEmail(email)
  }

  const checkEmail = value => {
    if (!value) {
      setEmailError('Email is required')
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email format')
    } else {
      setFormError('')
      setEmailError('')
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!username && !password && !email) {
      setUsernameError('Username is required')
      setPasswordError('Password is required')
      setEmailError('Email is required')
      return
    }

    if (!username) {
      setUsernameError('Username is required')
      return
    }

    if (!password) {
      setPasswordError('Password is required')
      return
    }

    if (!email) {
      setEmailError('Email is required')
      return
    }

    if (!emailRegex.test(email)) {
      return
    }
    setLoading(true)

    try {
      let abortController = new AbortController()
      const response = await axios.post(REGISTER_URL, {
        username,
        password,
        email
      })

      // Clear errors
      setFormError('')
      setSuccess(true)
      setTimeout(() => {
        navigate('/login', {replace: true})
        setSuccess(false)
      }, 1500)
      abortController.abort()
    } catch (error) {
      setFormError('Registration failed. Please try again.')
    }
    setLoading(false)
  }
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="1"></Col>
        <Col md="auto">
          {success && (
            <Alert variant="success" className="text-center">
              Register successfully
            </Alert>
          )}
          <div className="fs-2 fw-bolder text-center">Create an account</div>
          <Form className="form mt-4" onSubmit={handleSubmit}>
            {formError && <div className="error-text text-center mb-3">{formError}</div>}
            <FormGroup className="mb-2">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                className={usernameError && 'error-input'}
                value={username}
                aria-describedby="usernameHelpBlock"
                onBlur={handleUsernameBlur}
                onChange={event => handleUsernameChange(event)}
                disabled={loading}
              />
              <Form.Text id="usernameHelpBlock" className={usernameError && 'error-text'} muted>
                {usernameError}
              </Form.Text>
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                className={emailError && 'error-input'}
                value={email}
                aria-describedby="emailHelpBlock"
                onBlur={handleEmailBlur}
                onChange={event => handleEmailChange(event)}
                disabled={loading}
              />
              <Form.Text id="emailHelpBlock" className={emailError && 'error-text'} muted>
                {emailError}
              </Form.Text>
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                className={passwordError && 'error-input'}
                id="password"
                aria-describedby="passwordHelpBlock"
                onBlur={handlePasswordBlur}
                onChange={event => handlePasswordChange(event)}
                disabled={loading}
              />
              <Form.Text id="passwordHelpBlock" className={emailError && 'error-text'} muted>
                {passwordError}
              </Form.Text>
            </FormGroup>

            <Stack className="mt-3">
              <button type="submit" className="btn btn-login " disabled={loading}>
                Create an account
              </button>
            </Stack>
          </Form>
        </Col>
        <Col xs lg="1"></Col>
      </Row>
    </>
  )
}
