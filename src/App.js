import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AppLayout from './container/AppLayout';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<AppLayout />} />
    </Routes>
  </BrowserRouter>
);
export default App;