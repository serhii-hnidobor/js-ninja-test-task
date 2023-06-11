import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { heroApi } from '@services';

const extraArgument = {
  heroApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: false,
    });
  },
});

type storeType = typeof store;

export { store, type storeType, extraArgument };
