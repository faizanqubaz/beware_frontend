import './admindisplay.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar, faSpinner, faEllipsisVertical, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AdminDisplay = () => {
  const [discountData, setDiscountData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null); // Track which card's dropdown is open
  const [editMode, setEditMode] = useState(null); // Track which card is in edit mode
  const [editedData, setEditedData] = useState({}); // Store edited data
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://beware-seven.vercel.app/api/v2/ibex`);
        setDiscountData(response.data.data);
      } catch (error) {
        console.error('Error fetching discount data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % discountData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? discountData.length - 1 : prevIndex - 1
    );
  };

  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://beware-seven.vercel.app/api/v2/ibex/deletecard/${id}`);
      setDiscountData(discountData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const itemToEdit = discountData.find(item => item._id === id);
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
  
      console.log('response',response)
      setDiscountData(
        discountData.map(item => (String(item._id) === id ? response.data.updatedIbex : item))
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
      // Optionally, you can still preview it with FileReader if needed
      setEditedData({
        ...editedData,
        file, // store the file object
      });
    }
  };

  if (!discountData.length) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <FontAwesomeIcon icon={faSpinner} spin fontSize={'36px'} color='#dbb127' />
      </div>
    );
  }

  const totalItems = discountData.length;
  const itemsToShow = Math.min(3, totalItems);
  const visibleImages = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleImages.push(discountData[(currentIndex + i) % totalItems]);
  }
console.log('visibleimages',visibleImages)
  return (
    <div className="adminedit_main_container">
      <div className='adminedit_main_container_slider'>
        <div className='adminedit_main_container_slider_head'>
          <div className='adminedit_main_container_slider_flex'>
            <h2 className='adminedit_main_container_slider_heading'>ALL hunts</h2>
            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
          </div>
          <p className='adminedit_main_container_slider_para_head'>All Hunts</p>
        </div>

        <div className="adminedit_main__arrow_left" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
        </div>

        <div className='adminedit_main__image_container'>
          {visibleImages.map((item) => (
            <div key={item._id} className='adminedit_main__image_container_one'>
              <div className="adminedit_main__image_container_one_menu" onClick={() => toggleDropdown(item._id)}>
                <FontAwesomeIcon icon={faEllipsisVertical} fontSize={'20px'} color='#dbb127' />
                {showDropdown === item._id && (
                  <div className="adminedit_main__image_container_one_dropdown">
                    <button onClick={() => handleEdit(item._id,item.ibexphotos[0].cloudinary_id)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                )}
              </div>
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
                    className='adminedit_main__image_container_one_image'
                    src={item.ibexphotos[0]?.cloudinary_url} // Access the cloudinary_url
                    alt={item.description}
                  />
                  <p className='adminedit_main__image_container_one_image_paragraph'>{item.description}</p>
                  <div className='adminedit_main__image_container_one_head'>
                    <p style={{ color: '#dbb127' }}>price from</p>
                    <FontAwesomeIcon icon={faStar} color='#dbb127' />
                    <FontAwesomeIcon icon={faStar} color='#dbb127' />
                    <FontAwesomeIcon icon={faStar} color='#dbb127' />
                    <FontAwesomeIcon icon={faStar} color='#dbb127' />
                    <FontAwesomeIcon icon={faStar} color='#dbb127' />
                    <p style={{ color: '#dbb127' }}>(3.6)</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '71%', color: 'white' }}>
                    <div className='discount_main__image_container_two_head'>
                      <p style={{ fontSize: '25px' }}>{'$' + item.newPrice}</p>
                      <p style={{ textDecoration: 'line-through' }}>{'$' + item.priceOld}</p>
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

        <div className='adminedit_main__arrow_right_hr'>
          <hr />
        </div>

        <div className="adminedit_main__arrow_right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
        </div>
      </div>
    </div>
  );
};

export default AdminDisplay;