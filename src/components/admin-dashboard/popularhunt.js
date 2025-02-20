import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './popularhunt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminPortor = () => {
    const navigate = useNavigate();
    const [ibexname, setibexName] = useState('');
    const [description, setDescription] = useState('');
    const [ibexphotos, setIbexPhotos] = useState([]);
    const [ibexrate, setIbexRate] = useState('');
    const [guidephotos, setguidephotos] = useState([]);
    const [guideName, setGuideName] = useState('');
    const [Ibexlocation, setIbexLocation] = useState('');
    const [huntername, setHunterName] = useState('');
    const [hunterlocation, setHunterLocation] = useState('');
    const [guiderate, setGuideRate] = useState('');
    const [ibexsize, setIbexSize] = useState('');
    const [priceOld, setPriceOld] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [huntdate, setHuntdate] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);

    const regionMap = {
        passu: { lat: '36.4789', lon: '74.8936' },
        batura: { lat: '36.5675', lon: '74.8456' },
        chitral: { lat: '35.8511', lon: '71.7864' },
        skardu: { lat: '35.2973', lon: '75.6330' }
    };

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        if (regionMap[selectedRegion]) {
            setLatitude(regionMap[selectedRegion].lat);
            setLongitude(regionMap[selectedRegion].lon);
        }
    };

    const handleIbexPhotoChange = (e) => {
        const files = Array.from(e.target.files);
        console.log('Selected Ibex Photos:', files); // Debug selected files
        setIbexPhotos(files);
    };

    const handleGuidePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        console.log('Selected Guide Photos:', files); // Debug selected files
        setguidephotos(files);
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'congpassu'); // Ensure this is correct

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dyds5ol3y/image/upload`,
                formData
            );
            return {
                public_id: response.data.public_id,
                url: response.data.secure_url
            };
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return null;
        }
    };

    const uploadAllImages = async (files) => {
        const uploadedImages = await Promise.all(
            files.map(async (file) => await uploadToCloudinary(file))
        );
        return uploadedImages.filter((img) => img !== null);
    };

    const resetForm = () => {
        setibexName('');
        setDescription('');
        setIbexPhotos([]);
        setIbexRate('');
        setguidephotos([]);
        setGuideName('');
        setIbexLocation('');
        setHunterName('');
        setHunterLocation('');
        setGuideRate('');
        setIbexSize('');
        setPriceOld('');
        setNewPrice('');
        setHuntdate('');
        setLatitude('');
        setLongitude('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload Ibex Photos to Cloudinary
            const uploadedIbexPhotos = await uploadAllImages(ibexphotos);
            const formattedIbexPhotos = uploadedIbexPhotos.map(img => ({
                cloudinary_id: img.public_id,
                cloudinary_url: img.url
            }));

            // Upload Guide Photos to Cloudinary
            const uploadedGuidePhotos = await uploadAllImages(guidephotos);
            const formattedGuidePhotos = uploadedGuidePhotos.map(img => ({
                cloudinary_id: img.public_id,
                cloudinary_url: img.url
            }));

            // Create a new FormData object
            const formData = new FormData();

            // Append all the text fields to the FormData object
            formData.append('ibexname', ibexname);
            formData.append('description', description);
            formData.append('ibexrate', ibexrate);
            formData.append('guideName', guideName);
            formData.append('ibexlocation', Ibexlocation);
            formData.append('ibexsize', ibexsize);
            formData.append('priceOld', priceOld);
            formData.append('huntername', huntername);
            formData.append('hunterlocation', hunterlocation);
            formData.append('newPrice', newPrice);
            formData.append('huntdate', huntdate);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            // Append Ibex Photos URLs
            formattedIbexPhotos.forEach((photo, index) => {
                formData.append(`ibexphotos[${index}]`, photo.cloudinary_url);
                formData.append(`ibexpublicid[${index}]`, photo.cloudinary_id);
            });

            // Append Guide Photos URLs
            formattedGuidePhotos.forEach((photo, index) => {
                formData.append(`guidephotos[${index}]`, photo.cloudinary_url);
                formData.append(`guidepublicid[${index}]`, photo.cloudinary_id);
            });

            const formDataObj = {};
            for (let [key, value] of formData.entries()) {
                formDataObj[key] = value;
            }
            console.log('formdaaa', formDataObj)
            // Send the FormData to the backend
            const response = await axios.post('https://beware-seven.vercel.app/api/v2/ibex/popular', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Hunt added:', response.data);
            setLoading(false);
            setSuccessMessage(true);
            resetForm();
            setTimeout(() => {
                navigate('/dashboard');
                setSuccessMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding hunt:', error);
            setLoading(false);
        }
    };

    return (
        <div className="admin_portor_container">
            {loading && (
                <div className="loading-overlay">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            )}
            <div className={`admin_portor_content ${loading ? 'blur' : ''}`}>
                <div className="admin_portor_head">
                    <h2 className="admin_portor_heading">Add POPULAR Hunt</h2>
                </div>
                {successMessage && <p className="success_message">Hunt added successfully!</p>}

                <form onSubmit={handleSubmit}>
                <div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="ibexname">Ibex Name:</label>
        <input
            type="text"
            id="ibexname"
            className="admin_portor_flex_1_input"
            value={ibexname}
            onChange={(e) => setibexName(e.target.value)}
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="description">Description:</label>
        <input
            type="text"
            id="description"
            className="admin_portor_flex_1_input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="ibexphotos">Ibex Photos:</label>
        <input
            type="file"
            id="ibexphotos"
            className="admin_portor_flex_1_input"
            onChange={handleIbexPhotoChange}
            multiple // Allow multiple files
            accept="image/*"
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="ibexrate">Ibex Rate:</label>
        <input
            type="text"
            id="ibexrate"
            className="admin_portor_flex_1_input"
            value={ibexrate}
            onChange={(e) => setIbexRate(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="guideName">Guide Name:</label>
        <input
            type="text"
            id="guideName"
            className="admin_portor_flex_1_input"
            value={guideName}
            onChange={(e) => setGuideName(e.target.value)}
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="ibexsize">Ibex Size:</label>
        <input
            type="text"
            id="ibexsize"
            className="admin_portor_flex_1_input"
            value={ibexsize}
            onChange={(e) => setIbexSize(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label htmlFor="region">Region:</label>
        <select id="region" onChange={handleRegionChange}>
            <option value="">Select Region</option>
            <option value="passu">Passu</option>
            <option value="batura">Batura</option>
            <option value="chitral">Chitral</option>
            <option value="skardu">Skardu</option>
        </select>
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="guiderate">Guide Rate:</label>
        <input
            type="text"
            id="guiderate"
            className="admin_portor_flex_1_input"
            value={guiderate}
            onChange={(e) => setGuideRate(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="huntername">Hunter Name:</label>
        <input
            type="text"
            id="huntername"
            className="admin_portor_flex_1_input"
            value={huntername}
            onChange={(e) => setHunterName(e.target.value)}
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="hunterlocation">Hunter Location:</label>
        <input
            type="text"
            id="hunterlocation"
            className="admin_portor_flex_1_input"
            value={hunterlocation}
            onChange={(e) => setHunterLocation(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="huntdate">Hunt Date:</label>
        <input
            type="text"
            id="huntdate"
            className="admin_portor_flex_1_input"
            value={huntdate}
            onChange={(e) => setHuntdate(e.target.value)}
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="photos">Guide Photos:</label>
        <input
            type="file"
            id="photos"
            className="admin_portor_flex_1_input"
            onChange={handleGuidePhotoChange}
            multiple
            accept="image/*"
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1">
    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="priceOld">Old Price:</label>
        <input
            type="text"
            id="priceOld"
            className="admin_portor_flex_1_input"
            value={priceOld}
            onChange={(e) => setPriceOld(e.target.value)}
            required
        />
    </div>

    <div className="admin_portor_flex_1_conatiner">
        <label className="admin_portor_flex_1_label" htmlFor="newPrice">New Price:</label>
        <input
            type="text"
            id="newPrice"
            className="admin_portor_flex_1_input"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
        />
    </div>
</div>

<div className="admin_portor_flex_1_conatiner_btn">
    <button type="submit" className="admin_portor_flex_1_conatiner_button" disabled={loading}>
        {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
            'Submit'
        )}
    </button>
</div>
                </form>
            </div>
        </div>
    );
};

export default AdminPortor;