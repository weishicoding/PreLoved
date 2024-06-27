import React, {useState} from 'react'
import {Grid, Avatar, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, TextField, Button, Container, styled, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import theme from '../theme'
import axiosInstance from '../services/http'

const StyledContainer = styled(Container)(({theme}) => ({
  width: 450,
  height: '100%',
  marginTop: theme.spacing(5)
}))

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')

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
      const response = await axiosInstance.post("/auth/login", {
        username,
        password
      })
			console.log(response)

      // Clear errors
      setFormError('')
      setUsernameError('')
      setPasswordError('')
    } catch (error) {
      console.error('Login error:', error)
      setFormError("Invalid Username or Password")
    }
  }

  return (
    <StyledContainer>
      <Grid align="center">
        <Avatar sx={{bgcolor: 'rgb(0, 113, 178)'}}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>Log in or register</h2>
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
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{marginTop: theme.spacing(1)}}>
          <Typography variant="button" align="center">
            Log in
          </Typography>
        </Button>
      </form>
      <Typography variant="subtitle2" align="center" style={{marginTop: theme.spacing(7)}}>
        New here?
      </Typography>
      <Typography variant="subtitle2" align="center">
        Create an account, it only takes a minute.
      </Typography>
      <Button variant="outlined" color="dark" size="large" fullWidth style={{marginTop: theme.spacing(1)}}>
        <Typography variant="button" align="center">
          Create an account
        </Typography>
      </Button>
    </StyledContainer>
  )
}
