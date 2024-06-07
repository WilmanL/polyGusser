import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import AuthContext from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({setReady}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {authTokens, setTokens} = useContext(AuthContext)

    const handleLogin = async () => {
        const response = await fetch(`http://3.145.19.247:5000/polyguesser/login?userName=${username}&password=${password}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: username,
            password: password
          })
        })
      
        if (response.ok) {
          const data = await response.json()
          setTokens(data)
          navigate('/polyguesser/contextoGame');
          setReady(true);
        } 
        else {
          console.log(response);
        }
    }

    const handleRegister = () => {
      navigate('/polyguesser/register');
    }

    console.log(authTokens);

  return (
    <Grid container justify="center" style={{ minHeight: '100vh' }}>
      <Paper style={{ padding: 20, width: '100%', height: '100vh', textAlign: 'center' }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              style={{ width: '30%' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              style={{ width: '30%' }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="contained" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}