import React from "react";
import { Grid, Paper, Avatar, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, TextField, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import '../variables.css'

export const Login = () => {

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	const paperStyle = {padding: 20, height: '70vh', width:400, margin: "20px auto"}
	const loginText = {fontSize: "16px", fontWeight: 700, color: "black", padding: "4px 0"}
	return(
		
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar sx={{ bgcolor: 'rgb(0, 113, 178)' }}>
						<LockOutlinedIcon/>
					</Avatar>
					<h2>Log in or register</h2>
				</Grid>
				<FormControl variant="outlined" fullWidth margin="normal">
					<TextField
						id="outlined-Username-flexible"
						label="Username"
						multiline
						maxRows={4}
					/>
				</FormControl>
				<FormControl variant="outlined" fullWidth margin="normal">
					<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
				</FormControl>
				<Button variant="contained" className="custom-button margin-top-small" color="primary" size="large" fullWidth>
					<div style={loginText}>Log in</div>
				</Button>
				<Grid align="center" className="margin-top-large">
					<div>New here?</div>
					<div>Create an account, it only takes a minute.</div>
				</Grid>
				<Grid align="center" className="margin-top-middle">
					<Button variant="outlined" className="custom-button" color="dark" size="large"  fullWidth >
						<div style={loginText}>Create an account</div>
					</Button>
				</Grid>
			</Paper>
		</Grid>
	)
}


