import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import AuthContext from '../components/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {authTokens, setTokens} = useContext(AuthContext)

    const handleLogin = async () => {
        const response = await fetch(`http://3.145.19.247:5000/polygusser/login?userName=${username}&password=${password}`, {
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
        } 
        else {
          console.log(response);
        }
    }

  return (
    <Grid container justify="center" style={{ minHeight: '100vh' }}>
      <Paper style={{ padding: 20, width: '100%', height: '100vh' }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}