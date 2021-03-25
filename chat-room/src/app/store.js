import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../features/rooms/roomsSlice';

export default configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});
