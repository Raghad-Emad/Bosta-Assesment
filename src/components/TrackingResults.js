import './trackingresults.css';
import { useSelector } from 'react-redux';
import { selectTrackingData, selectLoading, selectError } from '../features/trackingSlice';

const TrackingResults = () => {
  const trackingData = useSelector(selectTrackingData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackingData) {
    return <div></div>;
  }


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


      <div className='trackinginfo'>

        <div className='lineone'>
          <p>Ship Number {trackingData.TrackingNumber}</p>
          <p>Last Update</p>
          <p>Vendor Name</p>
          <p>Time to receive</p>
        </div>

        <div className='linetwo'>
          <p>{trackingData.CurrentStatus.state}</p>
          <p>{new Date().toDateString()}</p>
          <p>Souq.com</p>
          <p>{new Date(trackingData.PromisedDate).toLocaleString()}</p>
        </div>


      </div>

      <p>Transit Details</p>
      <table>
        <thead>
          <tr>
            <th>Hub</th>
            <th>Date</th>
            <th>Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>

          {ticketCreatedEvent && (
            <tr key={ticketCreatedEvent.timestamp}>
              <td>
                {trackingData.TransitEvents
                  .slice()
                  .reverse()
                  .map(event => event.hub && event.hub.split(' ')[0])
                  .find(hub => hub) || ''}
              </td>
              {/* Adding null check for deliveredEvent.timestamp */}
              <td>{deliveredEvent && deliveredEvent.timestamp ? new Date(deliveredEvent.timestamp).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '-'}</td>
              <td>{new Date(ticketCreatedEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{ticketCreatedEvent.state}</td>
            </tr>
          )}
          {packageReceivedEvent ? (
            <tr key={packageReceivedEvent.timestamp}>
              <td>
                {trackingData.TransitEvents
                  .slice()
                  .reverse()
                  .map(event => event.hub && event.hub.split(' ')[0])
                  .find(hub => hub) || ''}
              </td>
              {/* Adding null check for deliveredEvent.timestamp */}
              <td>{deliveredEvent && deliveredEvent.timestamp ? new Date(deliveredEvent.timestamp).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '-'}</td>
              <td>{new Date(packageReceivedEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{packageReceivedEvent.state}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3"></td>
            </tr>
          )}
          {outForDeliveryEvent && (
            <tr key={outForDeliveryEvent.timestamp}>
              <td>
                {trackingData.TransitEvents
                  .slice()
                  .reverse()
                  .map(event => event.hub && event.hub.split(' ')[0])
                  .find(hub => hub) || ''}
              </td>
              {/* Adding null check for deliveredEvent.timestamp */}
              <td>{deliveredEvent && deliveredEvent.timestamp ? new Date(deliveredEvent.timestamp).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '-'}</td>
              <td>{new Date(outForDeliveryEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{outForDeliveryEvent.state}</td>
            </tr>
          )}
          {deliveredEvent ? (
            <tr key={deliveredEvent.timestamp}>
              <td>
                {trackingData.TransitEvents
                  .slice()
                  .reverse()
                  .map(event => event.hub && event.hub.split(' ')[0])
                  .find(hub => hub) || '-'}
              </td>
              {/* Adding null check for deliveredEvent.timestamp */}
              <td>{deliveredEvent && deliveredEvent.timestamp ? new Date(deliveredEvent.timestamp).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '-'}</td>
              <td>{new Date(deliveredEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{deliveredEvent.state}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingResults;
