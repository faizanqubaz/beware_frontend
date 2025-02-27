import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar, faSpinner, faEllipsisVertical, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './projects.css';
import FooterComponent from '../Footer/footer';
import { useNavigate } from "react-router-dom";

const ProjectsComponent = () => {
  const navigate = useNavigate();
  const [sponsors, setSponsors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null); // Track which card's dropdown is open
  const [editMode, setEditMode] = useState(null); // Track which card is in edit mode
  const [editedData, setEditedData] = useState({}); // Store edited data
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/project/getall`);
        setSponsors(response.data.projects);
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1
    );
  };

  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleCardClick = (item) => {
    navigate(`/projectdetail/${item._id}`, { state: { item } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://beware-seven.vercel.app/api/v2/ibex/deletecard/${id}`);
      setSponsors(sponsors.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const itemToEdit = sponsors.find(item => item._id === id);
    setEditedData(itemToEdit);
  };

  const handleSave = async (id) => {
    setLoading(true); // Set loading to true when the save process starts
    try {
      const formData = new FormData();
      formData.append("description", editedData.description);
      formData.append("newPrice", editedData.newPrice);
      formData.append("priceOld", editedData.priceOld);
      formData.append("huntdate", editedData.huntdate);
      // Append the file (assuming you stored the File object in state)
      if (editedData.file) {
        formData.append("ibexphotos", editedData.file);
      }

      const response = await axios.put(
        `https://beware-seven.vercel.app/api/v2/ibex/updatecard/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSponsors(
        sponsors.map(item => (String(item._id) === id ? response.data.updatedIbex : item))
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setLoading(false); // Set loading to false when the save process ends
    }
  };

  const handleChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedData({
        ...editedData,
        file, // store the file object
      });
    }
  };

  if (!sponsors.length) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <FontAwesomeIcon icon={faSpinner} spin fontSize={'36px'} color='#dbb127' />
      </div>
    );
  }

  const totalItems = sponsors.length;
  const itemsToShow = Math.min(3, totalItems);
  const visibleSponsors = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleSponsors.push(sponsors[(currentIndex + i) % totalItems]);
  }
console.log('visiblesponsors',visibleSponsors)

  return (
    <>
      <div className="breadcrumb_sponsors">
        <a href="/">Home</a> &gt; Sponsors
      </div>
      <div className="sponsors-container">
        <div className='sponsors-slider'>
          <div className='sponsors-slider-head'>
            <div className='sponsors-slider-flex'>
              <h2 className='sponsors-slider-heading'>ALL Projects</h2>
              <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
            </div>
            <p className='sponsors-slider-para-head'>All Projects</p>
          </div>

          <div className="sponsors-arrow-left" onClick={handlePrev}>
            <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
          </div>

          <div className='sponsors-image-container'>
            {visibleSponsors.map((item) => (
              <div key={item._id} onClick={() => handleCardClick(item)}
              style={{ cursor: "pointer" }} className='sponsors-card'>
            
                {editMode === item._id ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <input
                      type="text"
                      placeholder='description'
                      value={editedData.description || ''}
                      onChange={(e) => handleChange(e, 'description')}
                    />
                    <input
                      type="number"
                      placeholder='old price'
                      value={editedData.newPrice || ''}
                      onChange={(e) => handleChange(e, 'newPrice')}
                    />
                    <input
                      type="number"
                      placeholder='new price'
                      value={editedData.priceOld || ''}
                      onChange={(e) => handleChange(e, 'priceOld')}
                    />
                    <input
                      type="date"
                      value={editedData.huntdate || ''}
                      onChange={(e) => handleChange(e, 'huntdate')}
                    />
                    <button onClick={() => handleSave(item._id)} disabled={loading}>
                      {loading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <img
                      className='sponsors-card-image'
                      src={item.projectphotos[0]?.cloudinary_url} // Access the cloudinary_url
                      alt={item.description}
                    />
                    <p className='sponsors-card-description'>{item.projectname}</p>
                    <div className='sponsors-card-head'>
                      <p style={{ color: '#dbb127' }}>project cost</p>
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <FontAwesomeIcon icon={faStar} color='#dbb127' />
                      <p style={{ color: '#dbb127' }}>(3.6)</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '71%', color: 'white' }}>
                      <div className='sponsors-card-price'>
                        <p style={{ fontSize: '25px' }}>{'RS' +' '+ item.projectcost}</p>
                        <p>{ item.projecttype}</p>
                      </div>
                      <p style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                        {new Date(item.huntdate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='sponsors-arrow-right-hr'>
            <hr />
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