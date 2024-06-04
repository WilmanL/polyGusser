import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function IndividualLeaderBoard({ userName, numberOfGuesses, date }) {
  return (
    <Grid container alignItems="center" sx={{ border: '1px solid #ddd', borderRadius: '5px', padding: '5%', width: '100%' }}>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of guesses: {numberOfGuesses}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {date}
        </Typography>
      </Grid>
    </Grid>
  );
}