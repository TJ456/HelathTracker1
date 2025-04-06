import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'; // Doctor icon
import './DoctorList.css';
const doctorsData = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      experience: '10 years',
      availability: 'Available Now',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      experience: '8 years',
      availability: 'Available in 30 mins',
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Dr. Emily Brown',
      specialty: 'Pediatrician',
      experience: '12 years',
      availability: 'Available Tomorrow',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgeon',
      experience: '15 years',
      availability: 'Available Now',
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Dr. Sarah Lee',
      specialty: 'Gynecologist',
      experience: '9 years',
      availability: 'Available in 1 hour',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Dr. Robert Wilson',
      specialty: 'Neurologist',
      experience: '14 years',
      availability: 'Available Tomorrow',
      rating: 4.8,
    },
    {
      id: 7,
      name: 'Dr. Laura Davis',
      specialty: 'Psychiatrist',
      experience: '11 years',
      availability: 'Available Now',
      rating: 4.7,
    },
    {
      id: 8,
      name: 'Dr. James Miller',
      specialty: 'Oncologist',
      experience: '16 years',
      availability: 'Available in 2 hours',
      rating: 4.9,
    },
    {
      id: 9,
      name: 'Dr. Olivia Garcia',
      specialty: 'Endocrinologist',
      experience: '13 years',
      availability: 'Available Tomorrow',
      rating: 4.6,
    },
    {
      id: 10,
      name: 'Dr. William Martinez',
      specialty: 'Rheumatologist',
      experience: '10 years',
      availability: 'Available Now',
      rating: 4.8,
    },
  ];
const DoctorList = ({ onSelectDoctor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3;

  // Filter doctors based on search query
  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="doctor-list">
      {/* Heading for Available Doctors */}
      <h3>Available Doctors</h3>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {currentDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            {/* Doctor Name */}
            <h3>
              <FontAwesomeIcon icon={faStethoscope} className="doctor-icon" /> {doctor.name}
            </h3>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Availability:</strong> {doctor.availability}</p>
            <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>
            <button className="book-button" onClick={() => onSelectDoctor(doctor)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;