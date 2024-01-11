import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; 
import ParentRegistration from './components/ParentRegistration';
import ParentDashboard from './components/ParentDashboard';
import CreateChildAccount from './components/CreateChildAccount';
import Login from './components/Login';
import Chores from './components/Chores';
import ViewAllChores from './components/ViewAllChores';

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
            <Route path="/chores" element={<Chores />} />
            <Route path="/view-all-chores" element={<ViewAllChores />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;