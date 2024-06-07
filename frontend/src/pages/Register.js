import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await fetch(`http://3.145.19.247:5000/polygusser/register?password=${password}&userName=${username}`, {
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
            navigate('/polygusser/login');
        } else {
            console.log(response);
        }
    };

    return (
        <Grid container justify="center" style={{ minHeight: '100vh' }}>
        <Paper style={{ padding: 20, width: '100%', height: '100vh' }}>
            <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h5">Register</Typography>
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
                <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
                </Button>
            </Grid>
            </Grid>
        </Paper>
        </Grid>
    );
}