import { useState, useEffect, useContext} from "react";
import dayLight from "../assests/dayLight.jpg";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AuthContext from "./AuthContext";

export default function WordleResult({user_id}) {
    const { authTokens} = useContext(AuthContext);
    const [wordOfTheDay, setWordOfTheDay] = useState('');
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [date, setDate] = useState('');
    const [lastGuess, setLastGuess] = useState('');
    const [guessed, setGuessed] = useState(false);

    //dialog code
    const [open, setOpen] = useState(false);
    const [shareText, setShareText] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleShare = () => {
        const data = {
          user_id: authTokens.userName,
          guess_number: numberOfGuesses,
          date: date,
          last_guess: lastGuess,
          postContent: shareText,
          wordOfTheDay: wordOfTheDay
        };
      
        fetch('http://3.145.19.247:5000/polyguesser/wall', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
        setOpen(false);
      };

    useEffect(() => {
        fetch(`http://3.145.19.247:5000/polyguesser/contexto_result?user_id=${authTokens.userId}&user_name=${authTokens.userName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWordOfTheDay(data.wordInfo.game_word);
                setNumberOfGuesses(data.result.guess_number);
                setDate(data.result.date);
                setLastGuess(data.result.guess_word);
                setGuessed(data.result.guessed);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, [authTokens.userId, authTokens.userName]);
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        { guessed ?
            <CardMedia
            component="img"
            height="340"
            onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}}
            image={`https://picsum.photos/800/1000?${new Date().getTime()}`}
            alt="day Light"
            />
            :
            <CardMedia
            component="img"
            height="340"
            onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}}
            image={`https://picsum.photos/800/1000?${new Date().getTime()}`}
            alt="night Light"
            />
        }
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="primary">
                Result
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                Word of the Day : {wordOfTheDay}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                Total Guesses : {numberOfGuesses}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                Date : {date}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                Last Guess : {lastGuess}
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Share
        </Button>
      </CardActions>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Share your post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write about the post you want to share:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Share Text"
            type="text"
            fullWidth
            rows={4}
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            sx={{mt: 2}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleShare}>Share</Button>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

