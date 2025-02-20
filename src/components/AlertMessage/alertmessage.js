import React, { useEffect, useState } from "react";
import "./AlertMessage.css";

const AlertMessage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://beware-seven.vercel.app/api/v2/ibex/displaythemessage")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data); // Store the messages array
        } else if (Array.isArray(data.message) && data.message.length > 0) {
          setMessages(data.message);
        } else {
          setMessages([]); // Ensure it's empty if no data
        }
      })
      .catch((error) => {
        console.error("Error fetching alert message:", error);
        setMessages([]);
      });
  }, []);

  if (messages.length === 0) {
    return null; // Hide the component if there are no messages
  }

  return (
    <div className="alert-container">
      {messages.map((msg, index) => (
        <div key={index} className="alert-message">
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default AlertMessage;
