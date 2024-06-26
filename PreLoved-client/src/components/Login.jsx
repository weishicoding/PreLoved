import React from 'react'
import theme from '../theme'
import {Grid, Paper, Avatar, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, TextField, Button, Box, Container, styled, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const paperStyle = {padding: 20, height: '70vh', width: 400, margin: '20px auto'}
  const loginText = {fontSize: '16px', fontWeight: 700, color: 'black', padding: '4px 0'}

  const StyledContainer = styled(Container)(({theme}) => ({
    width: 450,
    height: '100%',
    marginTop: theme.spacing(5)
  }))
  return (
    <StyledContainer>
      <Grid align="center">
        <Avatar sx={{bgcolor: 'rgb(0, 113, 178)'}}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>Log in or register</h2>
      </Grid>
      <FormControl variant="outlined" fullWidth margin="normal">
        <TextField id="outlined-Username-flexible" label="Username" multiline maxRows={4} />
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" color="primary" size="large" fullWidth style={{marginTop: theme.spacing(1)}}>
        <Typography variant='button' align="center">
          Log in
        </Typography>
      </Button>
      <Typography variant="subtitle2" align="center" style={{marginTop: theme.spacing(7)}}>
        New here?
      </Typography>
      <Typography variant="subtitle2" align="center">
        Create an account, it only takes a minute.
      </Typography>
      <Button variant="outlined" color="dark" size="large" fullWidth style={{marginTop: theme.spacing(1)}}>
        <Typography variant='button' align="center">
          Create an account
        </Typography>
      </Button>
    </StyledContainer>
  )
}
