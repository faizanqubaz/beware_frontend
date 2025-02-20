import React, { useState, useEffect } from "react";
import "./admineditmessage.css";

function AdminEditMessage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  useEffect(() => {
    fetchEditMessages();
  }, []);

  const fetchEditMessages = () => {
    fetch("https://beware-seven.vercel.app/api/v2/ibex/displaythemessage")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setMessages(data);
        } else if (Array.isArray(data.message)) {
          setMessages(data.message);
        } else {
          setMessages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setMessages([]);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    console.log('id',id)
    fetch(`https://beware-seven.vercel.app/api/v2/ibex/deleteadminmessage/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted:", data);
        setMessages(messages.filter((msg) => msg._id !== id)); // Remove from UI
      })
      .catch((error) => console.error("Error deleting message:", error));
  };

  return (
    <div className="admineditapp">
      {loading ? (
        <p>Loading...</p>
      ) : messages.length > 0 ? (
        <div className="message-container">
          {messages.map((msg) => (
            <div className="admineditappcard" key={msg._id}>
              <div className="message-header">
                <p>{msg.message}</p>
                <div className="menu-container">
                  <button
                    className="menu-button"
                    onClick={() => setOpenMenu(openMenu === msg._id ? null : msg._id)}
                  >
                    ⋮
                  </button>
                  {openMenu === msg._id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleDelete(msg._id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
}

export default AdminEditMessage;
