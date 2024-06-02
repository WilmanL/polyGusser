import './Wordle.css';
import { useState, useEffect} from "react";

// hard set querty keyboard for wordle
const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm',]
];

export default function Wordle({document_today, setGuessWord}) {

    const [wordleInputs, setWordleInputs] = useState(Array(6).fill(''));
    const [referenceDoc, setReferenceDoc] = useState([]);

    //document today is being updated
    useEffect(() => {
        if (document_today.length > 0) {
            setReferenceDoc(prevReferenceDoc => [...prevReferenceDoc, document_today]);
        }
    }, [document_today]);

    useEffect(() => {
        if (referenceDoc.length > 0){
            for(let i = 0; i < referenceDoc.length; i++) {
                renderBlockChars("Empty", i);
                renderKeyboard("Emptykey", 0);
                renderKeyboard("Emptykey", 1);
                renderKeyboard("Emptykey", 2);
            }
        }
    }, [referenceDoc]);


    const renderKeyboard = (keyClass, keyRow) => {
        let keys = [];
        for(let i = 0; i < keyRow.length; i++) {
            let tempClass = keyClass;
            if(referenceDoc.length > 0){
                for(let j = 0; j < referenceDoc.length; j++) {
                    for(let k = 0; k < referenceDoc[j].length; k++) {
                        if(referenceDoc[j][k].guessCharacter === keyRow[i]) {
                            if(referenceDoc[j][k].color === 'green') {
                                tempClass = 'Greenkey';
                            }
                            else if(referenceDoc[j][k].color === 'yellow') {
                                tempClass = 'Yellowkey';
                            }
                            else if(referenceDoc[j][k].color === 'grey') {
                                tempClass = 'Graykey';
                            }
                            break;
                        }
                    }
                }
            }
            keys.push(<div className={tempClass} key={`${i}`}>{keyRow[i]}</div>);
        }
        return keys;
    };

    const handleInputChange = (rowIndex, blockIndex) => (event) => {
        let newWordleInputs = [...wordleInputs];
        let word = newWordleInputs[rowIndex].split('');

        if (word.length >= 5) {
            return; // If it is, prevent further input
        }

        word[blockIndex] = event.target.value;
        newWordleInputs[rowIndex] = word.join('');
        setWordleInputs(newWordleInputs);
      
        // Move focus to next input field
        if (blockIndex < 4) {
          const nextInput = document.getElementById(`input-${rowIndex}-${blockIndex + 1}`);
          if(nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (rowIndex, blockIndex) => (event) => {
        if (event.key === 'Enter') {
          let word = wordleInputs[rowIndex];
          if (word.length === 5) {
            console.log(word);
            setGuessWord(word);
          }
        }
        else if (event.key === 'Backspace') {
            let newWordleInputs = [...wordleInputs];
            let word = newWordleInputs[rowIndex].split('');
            word[blockIndex] = '';
            newWordleInputs[rowIndex] = word.join('');
            setWordleInputs(newWordleInputs);
        
            // Move focus to previous input field
            if (blockIndex > 0) {
              const previousInput = document.getElementById(`input-${rowIndex}-${blockIndex - 1}`);
              if (previousInput) previousInput.focus();
            }
        }
    };


    const renderBlockChars = (blockClassValue, rowIndex) => {
        let row = [];
        for(let j = 0; j < 5; j++) {
            let tempClass = '';
            if(referenceDoc.length > 0 && referenceDoc[rowIndex]) {
                const currentChar = referenceDoc[rowIndex][j];
                if(currentChar) {
                    if(currentChar.color === 'green') {
                        tempClass = 'Green';
                    }
                    else if(currentChar.color === 'yellow') {
                        tempClass = 'Yellow';
                    }
                    else if(currentChar.color === 'grey') {
                        tempClass = 'Gray';
                    }
                    else{
                        tempClass = 'Empty';
                    }
                }
                row.push(
                    <input 
                        id={`input-${rowIndex}-${j}`}
                        className={tempClass} 
                        value={wordleInputs[rowIndex][j] || ''} 
                        onChange={handleInputChange(rowIndex, j)} 
                        type="text" 
                        readOnly
                        onKeyDown={handleKeyDown(rowIndex, j)} 
                        key={`${j}`} 
                    />
                );
            }
            else{
                row.push(
                    <input 
                        id={`input-${rowIndex}-${j}`}
                        className={blockClassValue} 
                        value={wordleInputs[rowIndex][j] || ''} 
                        onChange={handleInputChange(rowIndex, j)} 
                        type="text" 
                        onKeyDown={handleKeyDown(rowIndex, j)} 
                        key={`${j}`} 
                    />
                );
            }
        }
        return row;
    };

  return (
    <div className="wordle">
        <div className="line"></div>
        <div className="title">
            <div className="title1">PoLy</div>
            <div className="title2">GUesSeR</div>
        </div>
        <div className="bar"></div>

        <div className="words">
            {Array(6).fill().map((_, rowIndex) => (
            <div className="cellRow" key={rowIndex}>
                {renderBlockChars("Empty", rowIndex)}
            </div>
            ))}
        </div>

        <div className="keyboard">
        {keyboard.map((keyRow, rowIndex) => (
            <div className="keyRow" key={rowIndex}>
            {renderKeyboard("Emptykey", keyRow)}
            </div>
        ))}
        </div>
    </div>
  );
}
