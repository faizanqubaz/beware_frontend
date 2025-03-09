import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar, faSpinner, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import FooterComponent from '../Footer/footer';
import samjon from '../../components/assets/samjon.jpg';
import tariq from '../../components/assets/tariq.jpeg';
import faizan from '../../components/assets/faizan.jpeg';
import mudassir from '../../components/assets/mudasir.jpeg';
import alvi from '../../components/assets/alvi.JPG'; 
import './projects.css';

const ProjectsComponent = () => {
  const navigate = useNavigate();
  
  // Mock Data
  const [sponsors, setSponsors] = useState([
    {
      _id: "1",
      projectname: "Green Energy Initiative",
      projectcost: "500,000",
      projecttype: "Renewable Energy",
      huntdate: "2025-04-10",
      projectphotos: [{ cloudinary_url: samjon }]
    },
    {
      _id: "2",
      projectname: "AI Research Hub",
      projectcost: "1,200,000",
      projecttype: "Technology",
      huntdate: "2025-06-15",
      projectphotos: [{ cloudinary_url: tariq }]
    },
    {
      _id: "3",
      projectname: "Water Conservation",
      projectcost: "300,000",
      projecttype: "Environmental",
      huntdate: "2025-05-20",
      projectphotos: [{ cloudinary_url: faizan }]
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1));
  };

  const handleCardClick = (item) => {
    navigate(`/projectdetail/${item._id}`, { state: { item } });
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const itemToEdit = sponsors.find(item => item._id === id);
    setEditedData(itemToEdit);
  };

  const handleSave = (id) => {
    setLoading(true);
    setTimeout(() => {
      setSponsors(sponsors.map(item => (item._id === id ? editedData : item)));
      setEditMode(null);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  if (!sponsors.length) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>
      <FontAwesomeIcon icon={faSpinner} spin fontSize={'36px'} color='#dbb127' />
    </div>;
  }

  // Determine the number of items to display based on screen size
  const isMobile = window.innerWidth <= 768; // Check if the screen is mobile
  const itemsToShow = isMobile ? 1 : 3; // Show 1 card on mobile, 3 on larger screens
  const visibleSponsors = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleSponsors.push(sponsors[(currentIndex + i) % sponsors.length]);
  }

  return (
    <>
      <div className="breadcrumb_sponsors">
        <a href="/">Home</a> &gt; Sponsors
      </div>
      <div className="sponsors-container">
        <div className='sponsors-slider'>
          <div className='sponsors-slider-head'>
            <h2 className='sponsors-slider-heading'>ALL Projects</h2>
          </div>

          <div className="sponsors-arrow-left" onClick={handlePrev}>
            <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
          </div>

          <div className='sponsors-image-container'>
            {visibleSponsors.map((item) => (
              <div
                key={item._id}
                onClick={() => handleCardClick(item)}
                className='sponsors-card'
                style={{
                  transform: isMobile ? `translateX(-${currentIndex * 100}%)` : 'none', // Slide effect for mobile
                }}
              >
                {editMode === item._id ? (
                  <div>
                    <input type="text" placeholder='Project Name' value={editedData.projectname || ''} onChange={(e) => handleChange(e, 'projectname')} />
                    <input type="text" placeholder='Project Cost' value={editedData.projectcost || ''} onChange={(e) => handleChange(e, 'projectcost')} />
                    <input type="date" value={editedData.huntdate || ''} onChange={(e) => handleChange(e, 'huntdate')} />
                    <button onClick={() => handleSave(item._id)} disabled={loading}>
                      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <img className='sponsors-card-image' src={item.projectphotos[0]?.cloudinary_url} alt={item.projectname} />
                    <p className='sponsors-card-description'>{item.projectname}</p>
                    <div className='sponsors-card-head'>
                      <p style={{ color: '#dbb127' }}>Project Cost: RS {item.projectcost}</p>
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <p style={{ color: '#dbb127' }}>(3.6)</p>
                    </div>
                    <p>{item.projecttype}</p>
                    <p>{new Date(item.huntdate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sponsors-arrow-right" onClick={handleNext}>
            <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ProjectsComponent;