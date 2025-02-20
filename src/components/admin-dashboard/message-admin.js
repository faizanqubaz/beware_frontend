import React, { useState } from 'react';
import './message-admin.css'; // Import the CSS file for styling

const AdminMessage = () => {
    const [message, setMessage] = useState('');

    const handleFormEditSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch('https://beware-seven.vercel.app/api/v2/ibex/savemessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to save the message');
            }

            const result = await response.json();
            console.log('Message saved successfully:', result);
            alert('Message saved successfully!');
            setMessage(''); // Clear the input after successful submission
        } catch (error) {
            console.error('Error saving the message:', error);
            alert('Failed to save the message. Please try again.');
        }
    };

    return (
        <div className="admin-message-container">
            <h2>News and Announcements</h2>
            <p>admin announcement message</p>
            <form className="contact-form" onSubmit={handleFormEditSubmit}>
                <textarea
                    className="message-input"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Save Message</button>
            </form>
            <div className="emergency-contact">
                <p>Call us for any emergency to this number</p>
                <p className="phone-number">+92 (355) 4329249</p>
            </div>
            <footer className="image-credit">
                <p>Image from Freepik</p>
            </footer>
        </div>
    );
};

export default AdminMessage;