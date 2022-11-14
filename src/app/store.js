import { configureStore } from '@reduxjs/toolkit'

//Persistir el estado
import storage from 'redux-persist/lib/storage'
import { persistReducer,   
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig={
  key: 'root',
  version: 1,
  storage, 
}

//Reducers
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)


export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
