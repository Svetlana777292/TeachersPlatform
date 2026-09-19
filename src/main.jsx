import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from "./App.jsx";
import {store} from "./store/store";
import {Provider} from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
          <ErrorBoundary>
              <App />
          </ErrorBoundary>
      </BrowserRouter>
  </Provider>
)
