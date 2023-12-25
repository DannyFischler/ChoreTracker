import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentRegistration from './components/ParentRegistration';
import ParentDashboard from './components/ParentDashboard';
import CreateChildAccount from './components/CreateChildAccount';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<ParentRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/create-child-account" element={<CreateChildAccount />} />
          {/* Add additional routes here */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
