import React, { useState } from 'react';
import './contactus.css';  // Create this CSS file for styling
import image1 from '../assets/card1.jpg';
import image2 from '../assets/passu1.jpg';
import FooterComponent from '../Footer/footer';
import axios from 'axios'; // Import axios to make HTTP requests

const ContactUs = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    subject: '',
    message: ''
  });
  
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('https://beware-seven.vercel.app/api/v2/ibex/contactus', formData); // Call your API endpoint
      if (response.status === 200) {
        setSubmissionStatus('Your message has been sent successfully!');
        setFormData({ name: '', phone: '', email: '', country: '', subject: '', message: '' }); // Reset form
      }
    } catch (error) {
      setSubmissionStatus('Error sending message. Please try again later.');
      console.error('Error sending contact form:', error);
    }
  };

  return (
    <>
      <div className="breadcrumb_contactus">
        <a href="/">Home</a> &gt; Contact us
      </div>
     
      <div className='contactus_heading'>
        <h2>CONTACT: PASSU BATURA IBEX
          <hr className='contactus_heading_hr' />
        </h2>
      </div>

      <div className="contactus-container">
        <div className="contactus_form-container">
          <h4>All fields are required</h4>
          <form className="contactus_contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name*" value={formData.name} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Your Phone*" value={formData.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Your Country*" value={formData.country} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject*" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message*" value={formData.message} onChange={handleChange} required></textarea>
            <div className="contactus_form_privacy-policy">
              <input type="checkbox" required />
              <label>
                I have read and I accept the <a href="#">Privacy Policy of PCC</a>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
          {submissionStatus && <p className="submission-status">{submissionStatus}</p>} {/* Feedback message */}
        </div>
        <div className="image-container">
          <img src={image1} alt="Sniper Image" className="contact-image" />
          <img src={image2} alt="GrandSlamIbex Logo" className="contact-image" />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ContactUs;
