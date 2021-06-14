import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";

function Write() {
  const [user, setUser] = useState(1);
  const [messages, setMessages] = useState([]);

  const viewMessage = messages.map(m => {
    return (
      <div key={m.id}>
        <h3>{m.name} : </h3>
        <h6>{m.timestamp}</h6>
        <p>{m.message}</p>
      </div>
    );
  });

  const handleUserKeyPress = useCallback(e => {
    const { key, ctrlKey } = e;
    if (1 <= Number(key) && Number(key) <= 5 && ctrlKey === true) {
      e.returnValue = false;
      setUser(Number(e.key));
      console.log(user);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const keyControl = e => {
    if (e.code === "Enter" && e.ctrlKey === true) {
      const new_message = {
        id: messages.length,
        name: user,
        timestamp: Date.now(),
        message: e.target.value,
      };
      e.target.value = "";
      setMessages(oldMessage => [...oldMessage, new_message]);
    }
  };

  return (
    <Card>
      <Card.Body>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-offset="0"
          className="scrollspy-example"
          tabIndex="0"
        >
          {viewMessage}
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} onKeyPress={keyControl} />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default Write;
