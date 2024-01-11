import React from 'react';
import { Routes, Route, BrowserRouter as Router, Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; 
import ParentRegistration from './components/ParentRegistration';
import ParentDashboard from './components/ParentDashboard';
import CreateChildAccount from './components/CreateChildAccount';
import Login from './components/Login';
import Chores from './components/Chores';
import ViewAllChores from './components/ViewAllChores';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<ParentRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/createchildaccount" element={<CreateChildAccount />} />
          <Route path="/chores" element={<Chores />} />
          <Route path="/viewallchores" element={<ViewAllChores />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
