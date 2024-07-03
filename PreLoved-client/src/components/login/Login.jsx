import React, {useState} from 'react'
import './index.css'
import {Col, Form, FormGroup, Row, Stack} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const LOGIN_URL = '/api/auth/login'
const Login = () => {
  const {setAuth} = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [formError, setFormError] = useState('')
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

  const handleRegister = () => {
    navigate('/register')
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (!username && !password) {
      setUsernameError('Username is required')
      setPasswordError('Password is required')
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

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({username, password}), {headers: {'Content-Type': 'application/json'}, withCredentials: true})
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({username, roles, accessToken})
      setUsername('')
      setPassword('')
      setFormError('')
      navigate(from, {replace: true})
    } catch (error) {
      if (!error.response) {
        setFormError('No Server Response')
      } else if (error.response?.status === 401) {
        setFormError('Invalid Username or Password')
      } else {
        setFormError('Login Failed')
      }
    }
  }

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="1"></Col>
        <Col md="auto">
          <div className="fs-2 fw-bolder text-center">Log in or register</div>
          <Form className="form mt-4" onSubmit={handleSubmit}>
            {formError && <div className="error-text text-center mb-3">The username or password provided is incorrect.</div>}
            <FormGroup className="mb-2">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                className={usernameError && 'error-input'}
                value={username}
                aria-describedby="passwordHelpBlock"
                onBlur={handleUsernameBlur}
                onChange={event => handleUsernameChange(event)}
              />
              <Form.Text id="passwordHelpBlock" className={usernameError && 'error-text'} muted>
                {usernameError}
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
              />
              <Form.Text id="passwordHelpBlock" className={passwordError && 'error-text'} muted>
                {passwordError}
              </Form.Text>
            </FormGroup>

            <Stack className="mt-3">
              <button type="submit" className="btn btn-login ">
                Log in
              </button>
            </Stack>
          </Form>
          <div className="mt-5 text-center">New here?</div>
          <div className="mt-1 text-center">Create an account, it only takes a minute.</div>
          <Stack className="mt-2">
            <button type="button" className="btn btn-register" onClick={handleRegister}>
              Create an account
            </button>
          </Stack>
        </Col>
        <Col xs lg="1"></Col>
      </Row>
    </>
  )
}

export default Login
