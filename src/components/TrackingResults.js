import React from 'react';
import { useSelector } from 'react-redux';
import { selectTrackingData, selectLoading, selectError } from '../features/trackingSlice';

const TrackingResults = () => {
  const trackingData = useSelector(selectTrackingData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {trackingData ? (
        <div>
          <pre>{JSON.stringify(trackingData, null, 2)}</pre>
        </div>
      ) : (
        <div>No tracking data available</div>
      )}
    </div>
  );
};

export default TrackingResults;
