import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adding-project.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AddProject = () => {
    const navigate = useNavigate();
    const [projectname, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [projectphotos, setProjectPhotos] = useState([]);
    const [completiondate, setCompletionDate] = useState('');
    const [ibexsize, setIbexSize] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [projecttype, setProjectType] = useState('');
    const [startdate, setStartDate] = useState('');
    const [lastdate, setLastdate] = useState('');

    const [projectcost, setProjectCost] = useState('');
    const [huntername, setHunterName] = useState('');
    const [hunterlocation, setHunterLocation] = useState('');
    const [projectfor, setProjectFor] = useState('');
 
    const [priceOld, setPriceOld] = useState('');
    const [projectsummary, setProjectSummary] = useState('');
  
    const [successMessage, setSuccessMessage] = useState(false);
 
    const [loading, setLoading] = useState(false);

    const regionMap = {
        passu: { lat: '36.4789', lon: '74.8936' },
        batura: { lat: '36.5675', lon: '74.8456' },
        yunz: { lat: '35.8511', lon: '71.7864' },
        kharamabod: { lat: '35.2973', lon: '75.6330' },
        suranabod:{ lat: '35.2973', lon: '75.6330' },
        tupopdan:{ lat: '35.2973', lon: '75.6330' }
    };

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        if (regionMap[selectedRegion]) {
            setLatitude(regionMap[selectedRegion].lat);
            setLongitude(regionMap[selectedRegion].lon);
        }
    };

    const handleProjectTypeChange = (e) => {
        const selectedType = e.target.value;
    setProjectType(selectedType);
    }

    const handleProjectForChange = (e) => {
        const selectedType = e.target.value;
        setProjectFor(selectedType);
    }

    const handleProjectPhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setProjectPhotos(files);
    };

  

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'congpassu');

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
        setProjectName('');
        setDescription('');
        setStartDate('')
        setLastdate('')
    
        setCompletionDate('');
        setProjectPhotos([]);
        setProjectCost('');
        // setIbexLocation('');
        setHunterName('');
        setHunterLocation('');
        // setGuideRate('');
        setIbexSize('');
        setPriceOld('');
        // setNewPrice('');
        // setHuntdate('');
        setLatitude('');
        setLongitude('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadedIbexPhotos = await uploadAllImages(projectphotos);
        const formattedIbexPhotos = uploadedIbexPhotos.map(img => ({
            cloudinary_id: img.public_id,
            cloudinary_url: img.url
        }));

   

        const formData = new FormData();
        formData.append('projectname', projectname);
        formData.append('description', description);
        formData.append('completiondate', completiondate);
        formData.append('projectcost', projectcost);
        formData.append('ibexsize', ibexsize);
        formData.append('projecttype', projecttype);
        formData.append('startdate', startdate);
        formData.append('lastdate', lastdate);
        formData.append('projectfor', projectfor);
       
        formData.append('priceOld', priceOld);
        formData.append('huntername', huntername);
        
        formData.append('summary', projectsummary);
       
        formData.append('hunterlocation', hunterlocation);
        // formData.append('newPrice', newPrice);

        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        formattedIbexPhotos.forEach((photo, index) => {
            formData.append(`projectphotos[${index}]`, photo.cloudinary_url);
            formData.append(`ibexpublicid[${index}]`, photo.cloudinary_id);
        });

        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
console.log('formdata',formDataObj)
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/v2/project/create', formDataObj, {
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
        <div className="addproject_container">
            <div className="addproject_head">
                <h2 className="addproject_heading">Add New Project</h2>
            </div>
            {successMessage && <p className="addproject_success_message">Project added successfully!</p>}

            <form onSubmit={handleSubmit}>
                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="projectname">Project Name:</label>
                        <input
                            type="text"
                            id="projectname"
                            value={projectname}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="projectphotos">Photos:</label>
                        <input
                            type="file"
                            id="projectphotos"
                            onChange={handleProjectPhotoChange}
                            multiple
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="completiondate">Completion Date(Expected):</label>
                        <input
                            type="date"
                            id="completiondate"
                            value={completiondate}
                            onChange={(e) => setCompletionDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="projectcost">Project Cost:</label>
                        <input
                            type="text"
                            id="projectcost"
                            value={projectcost}
                            onChange={(e) => setProjectCost(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="ibexsize">Ibex Size:</label>
                        <input
                            type="text"
                            id="ibexsize"
                            value={ibexsize}
                            onChange={(e) => setIbexSize(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="region">Region:</label>
                        <select id="region" onChange={handleRegionChange}>
                            <option value="">Select Region</option>
                            <option value="passu">Passu</option>
                            <option value="batura">Batura</option>
                            <option value="suranabod">Suranabod</option>
                            <option value="khuramabod">Khuramabad</option>
                            <option value="tupopdan">TupopDan</option>
                            <option value="yunz">Yunz</option>
                        </select>
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="projecttype">Project Type:</label>
                        <select id="projecttype" value={projecttype} onChange={handleProjectTypeChange}>
                            <option value="">Select Type</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="future">Future Plan</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="startdate">Start Date:</label>
                        <input
                            type="date"
                            id="startdate"
                            value={startdate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="lastdate">End Date:</label>
                        <input
                            type="date"
                            id="lastdate"
                            value={lastdate}
                            onChange={(e) => setLastdate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="addproject_form_group">
                    <div className="addproject_input_group">
                        <label htmlFor="projectfor">Project For:</label>
                        <select id="projecttype" value={projectfor} onChange={handleProjectForChange}>
                            <option value="">Select Type</option>
                            <option value="development">Development</option>
                            <option value="community">Community</option>
                            <option value="crises">Crises</option>
                          
                        </select>
                    </div>

                    <div className="addproject_input_group">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            id="summary"
                            value={projectsummary}
                            onChange={(e) => setProjectSummary(e.target.value)}
                            required
                            placeholder="Enter project summary..."
                            rows="5"  // Adjust the number of rows
                            cols="50" // Adjust the width
                            style={{ width: "100%", padding: "10px" }} // Optional inline styling
                        ></textarea>
                    </div>
                </div>

                <div className="addproject_button_group">
                    <button type="submit" disabled={loading}>
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject;