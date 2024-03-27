import { configureStore } from '@reduxjs/toolkit';
import trackingReducer from './features/trackingSlice';
import languageReducer from './features/languageSlice';

export default configureStore({
  reducer: {
    tracking: trackingReducer,
    language: languageReducer,
  },
});
