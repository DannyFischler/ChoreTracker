import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentRegistration from '../../ChoreTracker/my-react-app/src/components/ParentRegistration';
import ParentDashboard from '../../ChoreTracker/my-react-app/src/components/ParentDashboard';
import CreateChildAccount from '../../ChoreTracker/my-react-app/src/components/CreateChildAccount';
import Login from '../../ChoreTracker/my-react-app/src/components/Login';

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
