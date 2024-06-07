import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [school, setSchool] = useState(''); 
    const [work, setWork] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [from, setFrom] = useState(''); 
    const [aboutMe, setAboutMe] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        // You might want to update this part to include the new fields
        const response = await fetch(`http://localhost:5000/polygusser/register?password=${password}&userName=${username}`, {
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
            navigate('/polyguesser/login');
        } else {
            console.log(response);
        }
    };

    return (
        <Grid container justify="center" alignItems="flex-end" style={{ minHeight: '100vh' }}>
        <Paper style={{ padding: 20, width: '100%', height: '100vh', textAlign: 'center'}}>
            <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h5">Register</Typography>
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
                <TextField
                label="School"
                variant="outlined"
                style={{ width: '30%' }}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                label="Work"
                variant="outlined"
                style={{ width: '30%' }}
                value={work}
                onChange={(e) => setWork(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                label="Location"
                variant="outlined"
                style={{ width: '30%' }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                label="From"
                style={{ width: '30%' }}
                variant="outlined"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                label="about me"
                style={{ width: '30%' }}
                variant="outlined"
                value={from}
                onChange={(e) => setAboutMe(e.target.value)}
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