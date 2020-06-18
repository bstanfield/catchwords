import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4242";

function Socket() {
  const [response, setResponse] = useState("");
  const { current: socket } = useRef(socketIOClient(ENDPOINT));

  const sendMessageToSocket = () => {
    socket.send('hi');
  };

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <button onClick={() => sendMessageToSocket()}>Send message</button>
    </div>
  );
}

export default Socket;