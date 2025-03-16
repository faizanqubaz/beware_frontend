import React from 'react';
import './destinationanimal.css'; // Import the CSS file for styling
import batura4 from '../../components/assets/focus.jpg'; 
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg';
import bird from '../../components/assets/bird.jpg';
import hospility from '../../components/assets/hospitality.jpg';
import snow_leopard from '../../components/assets/snow_leopard.jpg';
import bluesheep from '../../components/assets/bluesheep.jpg';

const AnimalDestination = () => {
    const animals = [
        { name: 'Dove', price: 545, hunts: 78, image: bird },
        { name: 'Red deer', price: 4500, hunts: 59, image: bluesheep },
        { name: 'Blackbuck', price: 1650, hunts: 3.31, image: snow_leopard },
        { name: 'Duck', price: 1600, hunts: 30, image: batura },
        { name: 'Pigeon', price: 945, hunts: 27, image: bird },
        { name: 'Partridge', price: 1600, hunts: 18, image: batura3 },
    ];

    return (
        <div className="animal-destination-container">
            {/* Top Section with Text and Buttons */}
            <div className="animal-destination-container_top-section">
                <h1>Animals</h1>
            </div>

            {/* Image Grid */}
            <div className="animal-destination-container_top-section_image-grid">
                {animals.map((animal, index) => (
                    <div key={index} className="animal-card">
                        <img src={animal.image} alt={animal.name} className="animal-image" />
                        <div className="animal-info-overlay">
                            <div>
                            <h2 className='animal-info-overlay_heading'>{animal.name}</h2>
                            <p>from ${animal.price}</p>
                            </div>  
                            <button className="animal-info-overlay_heading_button_transparent">
        {animal.hunts} hunts
    </button>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimalDestination;