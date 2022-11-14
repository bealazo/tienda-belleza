import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import App from './App'

//Estilos
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";

//Redux
import store from './app/store'
import { Provider } from 'react-redux'

//para persistir estado
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
       <BrowserRouter>
         <PersistGate persistor={persistor}>
             <App/>
          </PersistGate>
       </BrowserRouter>
   
    </Provider>
  </React.StrictMode>
)
