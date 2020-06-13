import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { hitAPIEndpoint } from '../helpers/util'

const AddWord = () => {
  const [word, setWord] = useState('');
  const addWordToDb = async () => {
    const response = await hitAPIEndpoint('add-word', {
      name: word,
      password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
    });
    console.log('response: ', response);
    if (response.status === 422) {
      alert(`${word} already exists in the game 😲`);
    } else {
      alert(`${word} added to the game!`);
    }
    setWord('');
  }

  const handleChange = (event) => {
    setWord(event.target.value);
  }

  return (
    <div>
      <h1>Add a new word to the game</h1>
      <label>
        Name:
        <input type="text" value={word} onChange={handleChange} name="name" />
      </label>
      <button onClick={() => addWordToDb()}>Submit</button>
    </div>
  );
};

export default AddWord;