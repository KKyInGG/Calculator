import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './react-components/Navigation/NavigationBar';
import ButtonBody from './react-components/ButtonBody/ButtonBody';
import React, { useState, useRef } from 'react';

function App() {
  const [userExist, setUserExist] = useState(false);
  const buttonRef = useRef();
  

  window.addEventListener("hasUser", () => {
      console.log("setUserExist");
      setUserExist(window.localStorage.getItem("hasUser"));
  })

  const updateHistory = () => {
      buttonRef.current.updateHistory();
  }

  const sendHistoryData = (data) => {
     console.log("here3", data);
     buttonRef.current.storeHistory(data);
  }

  return (
    <div className="App">
      <NavigationBar userExist={userExist} updateData={updateHistory} sendOutData={sendHistoryData}/>
      <ButtonBody ref={buttonRef}/>
    </div>
  );
}

export default App;
