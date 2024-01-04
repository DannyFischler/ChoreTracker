import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Ensure this path is correct
import ParentRegistration from './components/ParentRegistration';
import ParentDashboard from './components/ParentDashboard';
import CreateChildAccount from './components/CreateChildAccount';
import Login from './components/Login';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route path="/register" element={<ParentRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ParentDashboard />} />
            <Route path="/create-child-account" element={<CreateChildAccount />} />
            {/* Additional routes can be added here */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
