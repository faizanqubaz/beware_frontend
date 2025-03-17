import React, { useState } from "react";
import "./searchhunt.css";
import batura2 from '../../components/assets/batura1.JPG';
import { Link } from 'react-router-dom';

export default function PopularDestinationSearchHunt() {
  const hunts = [
    {
      id: 1,
      title: "Yashpert Hunt By Raja Bhat",
      location: "Yashparth Batura",
      species: "Himiliyan Ibex",
      price: "$3,768",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 2,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 3,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 4,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 5,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 6,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 7,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 8,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 9,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
    {
      id: 10,
      title: "Deer Stalking in Southern England",
      location: "England, United Kingdom",
      species: "Chinese water deer, Muntjac deer",
      date: "23-02-2019",
      image: batura2,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHunts, setFilteredHunts] = useState(hunts);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Handle search functionality
  const handleSearch = () => {
    const filtered = hunts.filter(
      (hunt) =>
        hunt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hunt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hunt.species.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHunts(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredHunts.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="breadcrumb_populardestinationdetail">
        <a href="/">Home</a> &gt; Destination &gt; DestinationDetail &gt; DestinationSearch
      </div>

      <div className="populardestinationsearchhunt-container">
        {/* Sidebar */}
        <div className="populardestinationsearchhunt-sidebar">
          <h2>FILTER BY:</h2>
          <input
            type="text"
            placeholder="Select destination"
            className="populardestinationsearchhunt-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input type="text" placeholder="Add species" className="populardestinationsearchhunt-input" />
          <input type="date" className="populardestinationsearchhunt-input" />
          <div className="populardestinationsearchhunt-checkbox-group">
            <label><input type="checkbox" /> Trips with discount</label>
            <label><input type="checkbox" /> Package hunts</label>
            <label><input type="checkbox" /> New hunts</label>
          </div>
          <button onClick={handleSearch} className="populardestinationsearchhunt-checkbox-group_search_button">Search</button>
        </div>

        {/* Hunt Results */}
        <div className="populardestinationsearchhunt-content">
          <div className="populardestinationsearchhunt-hunt-results">
          {currentCards.map((hunt) => (
  <Link
    key={hunt.id}
    to={`/popularhunt/${hunt.id}`} // Dynamic route with hunt ID
    state={{ item: hunt }} // Pass the hunt object as state
    className="populardestinationsearchhunt-hunt-card-link" // Optional: Add a class for styling
  >
    <div className="populardestinationsearchhunt-hunt-card">
      <img src={hunt.image} alt={hunt.title} className="populardestinationsearchhunt-hunt-image" />
      <div>
        <div className="populardestinationsearchhunt-hunt-image_flex">
          <h3>{hunt.title}</h3>
          <p>{hunt.location}</p>
        </div>
        <div className="populardestinationsearchhunt-hunt-image_flex">
          <p className="populardestinationsearchhunt-species">{hunt.species}</p>
          <p className="populardestinationsearchhunt-species">24-01-2029</p>
        </div>
        <div className="populardestinationsearchhunt-price">
          <span className="populardestinationsearchhunt-current-price">{hunt.price}</span>
          {hunt.discount && <span className="populardestinationsearchhunt-old-price">{hunt.date}</span>}
        </div>
      </div>
    </div>
  </Link>
))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: Math.ceil(filteredHunts.length / cardsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredHunts.length / cardsPerPage)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}