 
import { orderApi } from '@/api/order.api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,

  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    immutableCheck: false,
    serializableCheck: false,
  })
    .concat(orderApi.middleware)

});
