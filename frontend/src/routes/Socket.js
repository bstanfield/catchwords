import React, { useState, useEffect, useRef } from "react";
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4242";

function Socket({ match }) {
  const [response, setResponse] = useState('');
  const [log, setLog] = useState(0);
  const [socket, setSocket] = useState({});

  const sendMessageToSocket = () => {
    socket.send({ id: match.params.id, alert: 'hi' });
  };
  
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.send({ join: match.params.id});
    setSocket(socket);
    socket.on('log', data => {
      setLog(data);
    });
    socket.on('welcome', data => {
      console.log(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <p>Participants: {log}</p>
      <button onClick={() => sendMessageToSocket()}>Send message</button>
    </div>
  );
}

export default withRouter(Socket);