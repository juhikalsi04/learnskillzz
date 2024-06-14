import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SampleTest from './components/pages/SampleTest'; // Import your SampleTest component
import Sidebar from './components/layouts/Sidebar';
import Discussion from './components/pages/Discussion';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Placement from './components/pages/Placement';
import OnlineTest from './components/pages/OnlineTest';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';
import Result from './components/Result';
import Company from './components/pages/Company';

import Aptitude from './components/pages/Aptitude';
import Reasoning from './components/pages/Reasoning';
import Verbal from './components/pages/Verbal'
import PostList from './components/PostList';
import ViewPost from './components/ViewPost';

function App() {
  return (
    <UserProvider>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/onlinetest" element={<OnlineTest />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/sampletest/result" element={<Result />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies/:companyName" element={<Company />} />
            <Route path="/aptitude" element={<Aptitude />} />
            <Route path="/reasoning" element={<Reasoning />} />
            <Route path="/verbal" element={<Verbal />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/post/:postId" element={<ViewPost />} />
            {/* <Route path="/post/:postId" element={<ViewPost />} /> */}

            {/* Add a route for SampleTest with the test number parameter */}
            <Route path="api/onlinetest/sampletest/:testNo" element={<SampleTest />} />
          </Routes>
        </Sidebar>
      </Router>
    </UserProvider>
  );
}

export default App;