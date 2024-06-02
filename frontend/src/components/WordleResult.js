import './Wordle.css';
import { useState, useEffect} from "react";

export default function WordleResult({user_id}) {

    const [wordOfTheDay, setWordOfTheDay] = useState('');
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [date, setDate] = useState('');
    const [lastGuess, setLastGuess] = useState('');
    const [guessed, setGuessed] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/polygusser/contexto_result?user_id=${user_id}`)
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
    <div className="wordle">
        <div className="line"></div>
        <div className="title">
            <div className="title1">PoLy</div>
            <div className="title2">GUesSeR</div>
        </div>
        <div className="bar"></div>

        <div className='words'>
            <div className="result-card">
                <div className="title3">Result:</div>
                <div className="title4">Word of the Day : {wordOfTheDay}</div>
                <div className="title4">Total Guesses : {numberOfGuesses}</div>
                <div className="title4">date : {date}</div>
                <div className="title4">Last Guess : {lastGuess}</div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{fontSize: '50px'}}>{guessed ? '😊' : '😞'}</div>
                </div>
            </div>
        </div>


        <div className="keyboard"/>
    </div>
  )
}
