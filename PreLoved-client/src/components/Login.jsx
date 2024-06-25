import React from "react";
import { Grid, Paper, Avatar, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, TextField, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const Login = () => {

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	const paperStyle = {padding: 20, height: '70vh', width:400, margin: "20px auto"}
	const avatarStyle = {backgroundColor: "#4f9d9b"}
	const loginText = {fontSize: "16px", fontWeight: 700}

	const { palette } = createTheme();
	const { augmentColor } = palette;
	const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
	const theme = createTheme({
		palette: {
			anger: createColor('#F40B27'),
			apple: createColor('#ffeb3be3'),
			steelBlue: createColor('#5C76B7'),
			violet: createColor('#BC00A3'),
		},
	});
	return(
		
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
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
				<ThemeProvider theme={theme}>
					<Button variant="contained" size="large" color="apple" fullWidth>
						<div style={loginText}>Log in</div>
					</Button>
				</ThemeProvider>
				
			</Paper>
		</Grid>
	)
	
	
}


