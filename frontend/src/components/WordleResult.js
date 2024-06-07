import { useState, useEffect} from "react";
import dayLight from "../assests/dayLight.jpg";
import nightLight from "../assests/nightLight.png";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function WordleResult({user_id}) {
    const [wordOfTheDay, setWordOfTheDay] = useState('');
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [date, setDate] = useState('');
    const [lastGuess, setLastGuess] = useState('');
    const [guessed, setGuessed] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/polyguesser/contexto_result?user_id=${user_id}`)
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
    }, [user_id]);
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        { guessed ?
            <CardMedia
            component="img"
            height="340"
            image={dayLight}
            alt="day Light"
            />
            :
            <CardMedia
            component="img"
            height="340"
            image={nightLight}
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
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

