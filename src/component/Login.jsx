// import * as React from 'react';
// import { AppProvider, SignInPage } from '@toolpad/core';
// import { useTheme } from '@mui/material/styles';

// const providers = [{ id: 'credentials', name: 'Email and Password' }];

// export default function SlotPropsSignIn() {
//   const theme = useTheme();
//   return (
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={(provider, formData) =>
//           alert(
//             `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
//           )
//         }
//         slotProps={{
//           emailField: { variant: 'standard' },
//           passwordField: { variant: 'standard' },
//           submitButton: { variant: 'outlined' },
//         }}
//         providers={providers}
//       />
//     </AppProvider>
//   );
// }
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStyles from "./style.js";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const LoginForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      navigate('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container  className={classes.container} maxWidth='sm'>
      <Box sx={{ mt: 4 }}>
        <Typography    variant="h3"
          component="h4"
          sx={{ fontFamily: "Times New Roman", fontWeight: "500"  }}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <div>
                 <TextField
            label="Email"
            name="email"
            type="email"
            variant="standard"
            className={classes.login_email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={{position:'relative'}}
            required />
              
            <AccountCircleOutlinedIcon  sx={{
                 position: 'absolute',
                 right: '345px',
                 top: '16%',
                 color: 'dimgray',
            }}/>
            <div className={ classes.userIcon}>
            </div>
          </div>
     
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
