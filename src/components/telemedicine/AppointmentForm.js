import React, { useState } from 'react';           
import './AppointmentForm.css';                    
                                                      
const AppointmentForm = ({ doctorName }) => {     
  const [formData, setFormData] = useState({      
    name: '',                                     
    email: '',                                      
    date: '',                                      
    time: '',
  });                                               
                                                      
  const handleChange = (e) => {                     
    const { name, value } = e.target;               
    setFormData({ ...formData, [name]: value }); 
  };
                                                    
  const handleSubmit = (e) => {                        
    e.preventDefault();                              
    alert(`Appointment booked with ${doctorName} on ${formData.date} at ${formData.time}`);
  };                                                  

  return (
    <div className="appointment-form">
      <h2>Book Appointment with {doctorName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}                 
            onChange={handleChange}               
            required                               
          />                                       
        </div>                                      
        <div className="form-group">              
          <label>Date:</label>                      
          <input                                     
            type="date"                              
            name="date"                            
            value={formData.date}                  
            onChange={handleChange}                 
            required                                
          />                                     
        </div>                                     
        <div className="form-group">              
          <label>Time:</label>                     
          <input                                   
            type="time"                             
            name="time"                             
            value={formData.time}                 
            onChange={handleChange}              
            required                                  
          />                                         
        </div>                                      
        <button type="submit" className="submit-button">
          Book Appointment                          
        </button>                                   
      </form>                                                        
    </div>                                          
  );                                                 
};                                                   
                                                     
export default AppointmentForm;                     