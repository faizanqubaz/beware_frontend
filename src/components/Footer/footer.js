import React from 'react';
import './footer.css'; // CSS for styling
import logo from '../assets/logo.png';
import './footer.css'; // CSS for styling

const FooterComponent = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo-section">
                    {/* Replace text logo with image logo */}
                    <img src={logo} alt="Grand Slam Ibex Logo" className="footer-logo-image" />
                    <p className="footer-tagline">FAIR CHASE, FAIR PRICE!</p>
                    <div className="footer-selectors">
                        <select className="footer-select">
                            <option value="USD">USD</option>
                            {/* Add more currencies as options */}
                        </select>
                        <select className="footer-select">
                            <option value="ENG">ENG</option>
                            <option value="URDU">URDU</option>
                            {/* Add more languages as options */}
                        </select>
                    </div>
                </div>

                <div className="footer-links-section">
                    <div className="footer-column">
                        <h4>BYH</h4>
                        <ul>
                            <li><a href="/aboutus">About us</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/mission">Our mission</a></li>
                            <li><a href="/contactus">Contact us</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Website</h4>
                        <ul>
                            <li><a href="/why-use">Why use BYH</a></li>
                            <li><a href="/hunting-map">Hunting map</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/terms">Terms & Conditions</a></li>
                            <li><a href="/privacy">Privacy policy</a></li>
                            <li><a href="/cookies">Cookie policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Why join</h4>
                        <ul>
                            <li><a href="/subscriptions">Smart subscriptions</a></li>
                            <li><a href="/recommendations">Recommendations</a></li>
                            <li><a href="/chats">Chats</a></li>
                            <li><a href="/invite">Invite your friend</a></li>
                            <li><a href="/favorites">Favorite hunts</a></li>
                            <li><a href="/gift-cards">Gift cards</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Account</h4>
                        <ul>
                            <li><a href="/login">Log in</a></li>
                            <li><a href="/signup">Sign up</a></li>
                            <li><a href="/partner">Become a partner</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-copyright">
                    <p>Copyright © 2024 GrandSlamIbex.com</p>
                </div>
                <div className="footer-social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="footer-partner">
                    <h4>|Grand <span>Slam</span> Ibex|</h4>
                    <p>Online marketplace for fishing trips from the BYH team!</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
