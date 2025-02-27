import React from 'react';
import './project-detail.css';
import buildingImage from '../assets/batura2.jpg'; // Adjust the path to your image
import { useLocation } from "react-router-dom";

const ProjectDetailComponent = () => {
    const location = useLocation();
  const { item } = location.state;
console.log('item',item)
  if (!item) {
    return <p>No Project Found</p>;
  }
    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
  return (
    <div className="project-detail-container">
      {/* Image Section */}
      <div className="image-section">
        <img src={item.projectphotos[0]?.cloudinary_url} alt="Mixed-use building" />
      </div>

      {/* Header Section */}
      <div className="header">
        <h1>project name: {item.projectname}</h1>
        <p>start date {formatDate(item.startdate)}</p>
        <p>end date {formatDate(item.lastdate)}</p>
        <p>Project Cost: {item.projectcost}</p>
        <button>{item.projecttype}</button>
      </div>

      {/* Meta Info Section */}
      <div className="meta-info">
        <p>Posted on {formatDate(item.startdate)} | Views: TIG | Saves: 1</p>
      </div>

      {/* Overview Section */}
      <div className="overview">
        <h2>Overview & description</h2>
        <p>
         the project {item.projectname} was started on {formatDate(item.startdate)} and completed on {formatDate(item.startdate)}, the project is to provide better faclilties for the peoples to enhance the living standard. the project total cost is {item.projectcost} and {item.summary}
        </p>
      </div>

      {/* Details Section */}
      <div className="details">
        <h3>Inheritor</h3>
        <ul>
          <li>Community Beneficiary: Robert Fox</li>
          <li>Living Area: Rural Development Zone</li>
          <li>Targeted Population: 150+ Families</li>
        </ul>
      </div>

      {/* Owner Info Section */}
      <div className="owner-info">
        <h3>Community Impact</h3>
        <p>The project not only resolved the water crisis but also empowered the local community by promoting health, hygiene, and sustainability practices.</p>
        <div className="owner-actions">
          <button>Call</button>
          <button>Message</button>
          <button>Report</button>
        </div>
      </div>

   
    </div>
  );
};

export default ProjectDetailComponent;