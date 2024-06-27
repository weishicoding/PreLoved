import React, {useState} from 'react'
import {Grid, Avatar, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, TextField, Button, Container, styled, Typography} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import axios from 'axios'
import theme from '../theme'
import {PersonAddOutlined} from '@mui/icons-material'
import axiosInstance from '../services/http'

const StyledContainer = styled(Container)(({theme}) => ({
  width: 450,
  height: '100%',
  marginTop: theme.spacing(5)
}))

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formError, setFormError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
    if (event.target.value) {
      setFormError('')
      setUsernameError('')
    }
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
    if (event.target.value) {
      setFormError('')
      setPasswordError('')
    }
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
    checkEmail(event.target.value)
  }

  const handleUsernameBlur = () => {
    if (!username) {
      setUsernameError('Username is required')
    } else {
      setFormError('')
      setUsernameError('')
    }
  }

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required')
    } else {
      setFormError('')
      setPasswordError('')
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

    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        password,
        email
      })
      setFormError('')
    } catch (error) {
      setFormError(error.response.data.message)
    }
  }

  return (
    <StyledContainer>
      <Grid align="center">
        <Avatar sx={{bgcolor: 'rgb(0, 113, 178)'}}>
          <PersonAddOutlined />
        </Avatar>
        <h2>Create an account</h2>
      </Grid>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <TextField
            id="outlined-Username-flexible"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
            multiline
            maxRows={4}
            error={!!usernameError}
          />
          <Typography variant="body2" color="error">
            {usernameError}
          </Typography>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password" error={!!passwordError}>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={!!passwordError}
          />
          <Typography variant="body2" color="error">
            {passwordError}
          </Typography>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <TextField id="outlined-email-flexible" label="Email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} error={!!emailError} />
          <Typography variant="body2" color="error">
            {emailError}
          </Typography>
        </FormControl>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{marginTop: theme.spacing(1)}}>
          <Typography variant="button" align="center">
            Create an account
          </Typography>
        </Button>
      </form>
    </StyledContainer>
  )
}
