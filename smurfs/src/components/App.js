import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Smurf from '../components/Smurf';
import SmurfForm from '../components/SmurfForm';

import "./App.css";

// Context
import { SmurfContext } from '../contexts/SmurfContext';

const App  = () => {
  const [smurf, setSmurf] = useState({});

  useEffect(() => {
    // setSmurf({"name":"Brainey","age":200,"height":"5cm","id":0})

    axios.get('http://localhost:3333/smurfs')
    .then(res => {
      console.log(res.data)
      setSmurf(res.data)
    })
    .catch(err => console.log(err.response.message))
  
  }, [])

  console.log(SmurfContext)

    return (
      <SmurfContext.Provider value={smurf}>
        <Smurf />
        {/* <SmurfForm /> */}
      </SmurfContext.Provider>
    );
}

export default App;
