import './App.css';
import UserCreate from './components/UserCreate';
import LoginPage from './components/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import UserList from './components/UserList';
import React from 'react';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<UserCreate />} />
          <Route path="login" element={<LoginPage />} />
          <Route path='users' element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
