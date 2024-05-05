import React from 'react'
import { useState } from 'react';

export default function NewPostComponent(prop) {
  const {placeholder, handleSend} = prop;
  const [userInput, setUserInput] = useState('');

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendVal = () => {
    handleSend(userInput);
    setUserInput('');
  }

  return (
    <div className="card-header bg-transparent">
        <form className="form-inline">
            <div className="input-group w-100">
                <input type="text" name="message" id="message" placeholder = {placeholder} className = "form-control form-control-md" value={userInput} onChange={handleChange}/>
                <div className="input-group-append">
                    <div className="input-group-text">
                            <i className="fas fa-forward" onClick={sendVal}/>
                        </div>
                </div>
            </div> 
        </form>
    </div>
  )
}
