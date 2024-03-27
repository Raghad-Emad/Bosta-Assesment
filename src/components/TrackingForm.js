import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTrackingData } from '../api'; 
import { fetchTrackingDataStart } from '../features/trackingSlice';

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber.trim() === '') return;
    dispatch(fetchTrackingDataStart()); 
    fetchTrackingData(trackingNumber, dispatch); 
  };

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={trackingNumber} onChange={handleChange} />
      <button type="submit">Track</button>
    </form>
  );
};

export default TrackingForm;
