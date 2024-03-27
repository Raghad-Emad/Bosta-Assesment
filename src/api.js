import axios from 'axios';
import { fetchTrackingDataStart, fetchTrackingDataSuccess, fetchTrackingDataFailure } from './features/trackingSlice';

const API_URL = 'https://tracking.bosta.co/shipments/track';

export const fetchTrackingData = async (trackingNumber, dispatch) => {
  dispatch(fetchTrackingDataStart());
  try {
    const response = await axios.get(`${API_URL}/${trackingNumber}`);
    dispatch(fetchTrackingDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchTrackingDataFailure(error.message));
  }
};
