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

  if (!trackingData) {
    return <div>No tracking data available</div>;
  }

  
  // Filter the transit events based on specific states
  const filteredEvents = trackingData.TransitEvents.filter(event =>
    ['TICKET_CREATED', 'OUT_FOR_DELIVERY' , 'DELIVERED'].includes(event.state)
  );

  // Find the index of the 'TICKET_CREATED' event
  const ticketCreatedIndex = trackingData.TransitEvents.findIndex(event =>
    event.state === 'TICKET_CREATED'
  );
  
  // Find the index of the next 'PACKAGE_RECEIVED' event after 'TICKET_CREATED'
  const packageReceivedIndex = trackingData.TransitEvents.findIndex((event, index) =>
    index > ticketCreatedIndex && event.state === 'PACKAGE_RECEIVED'
  );

  
  // Get the 'TICKET_CREATED' event and 'PACKAGE_RECEIVED' event if found
  const ticketCreatedEvent = ticketCreatedIndex !== -1 ? trackingData.TransitEvents[ticketCreatedIndex] : null;
  const packageReceivedEvent = packageReceivedIndex !== -1 ? trackingData.TransitEvents[packageReceivedIndex] : null;


  // Find the index of the 'OUT_FOR_DELIVERY' event
  const outForDeliveryIndex = trackingData.TransitEvents.findIndex(event =>
    event.state === 'OUT_FOR_DELIVERY'
  );

  // Find the index of the next 'DELIVERED' event after 'OUT_FOR_DELIVERY'
  const deliveredIndex = trackingData.TransitEvents.findIndex((event, index) =>
    index > outForDeliveryIndex && event.state === 'DELIVERED'
  );

  // Get the 'OUT_FOR_DELIVERY' event and 'DELIVERED' event if found
  const outForDeliveryEvent = outForDeliveryIndex !== -1 ? trackingData.TransitEvents[outForDeliveryIndex] : null;
  const deliveredEvent = deliveredIndex !== -1 ? trackingData.TransitEvents[deliveredIndex] : null;



  return (
    <div>
      {/* {trackingData ? (
        <div>
          <pre>{JSON.stringify(trackingData, null, 2)}</pre>
        </div>
      ) : (
        <div>No tracking data available</div>
      )} */}


<h2>Tracking Number: {trackingData.TrackingNumber}</h2>
      <p>Status: {trackingData.CurrentStatus.state}</p>
      <p>Receiving Date: {new Date(trackingData.PromisedDate).toLocaleString()}</p>

      <h2>Transit Events</h2>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Timestamp</th>
            <th>Hub</th>
          </tr>
        </thead>
        <tbody>
         
          {ticketCreatedEvent && (
            <tr key={ticketCreatedEvent.timestamp}>
              <td>{ticketCreatedEvent.state}</td>
              <td>{new Date(ticketCreatedEvent.timestamp).toLocaleString()}</td>
              <td>{ticketCreatedEvent.hub || '-'}</td>
            </tr>
          )}
          {packageReceivedEvent ? (
            <tr key={packageReceivedEvent.timestamp}>
              <td>{packageReceivedEvent.state}</td>
              <td>{new Date(packageReceivedEvent.timestamp).toLocaleString()}</td>
              <td>{packageReceivedEvent.hub || '-'}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3">No 'PACKAGE_RECEIVED' event found after 'TICKET_CREATED'</td>
            </tr>
          )}
          {outForDeliveryEvent && (
            <tr key={outForDeliveryEvent.timestamp}>
              <td>{outForDeliveryEvent.state}</td>
              <td>{new Date(outForDeliveryEvent.timestamp).toLocaleString()}</td>
              <td>{outForDeliveryEvent.hub || '-'}</td>
            </tr>
          )}
          {deliveredEvent ? (
            <tr key={deliveredEvent.timestamp}>
              <td>{deliveredEvent.state}</td>
              <td>{new Date(deliveredEvent.timestamp).toLocaleString()}</td>
              <td>{deliveredEvent.hub || '-'}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3">No 'DELIVERED' event found after 'OUT_FOR_DELIVERY'</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingResults;
