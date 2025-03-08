import React, { useState } from 'react';
import './whatsapp.css'; // Add CSS for WhatsApp and Chatbot

const WhatsAppAndChatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    "Hi! How can we help you?",
    "What is your name?",
    "What type of ibex are you looking for?",
    "What size of ibex do you need?",
    "What is your budget (rate) for the ibex?",
    "Thank you! We will contact you shortly."
  ];

  const handleChatbotClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (!isChatbotOpen) {
      // Start the conversation with the first question
      setChatMessages([{ text: questions[0], isBot: true }]);
      setCurrentQuestionIndex(1);
    } else {
      // Reset the chat when closing
      setChatMessages([]);
      setCurrentQuestionIndex(0);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user's message to the chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, isBot: false }
    ]);

    // Clear the input
    setUserInput('');

    // Add the next question from the bot
    if (currentQuestionIndex < questions.length) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: questions[currentQuestionIndex], isBot: true }
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890" // Replace with your WhatsApp number
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>

      {/* Chatbot Button */}
      <button className="chatbot-button" onClick={handleChatbotClick}>
        Chat with us
      </button>

      {/* Chatbot */}
      <div className={`chatbot ${isChatbotOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <span>Chat with us</span>
        </div>
        {isChatbotOpen && (
          <>
            <div className="chatbot-body">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.isBot ? 'bot' : 'user'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            {currentQuestionIndex < questions.length - 1 && (
              <div className="chatbot-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WhatsAppAndChatbot;