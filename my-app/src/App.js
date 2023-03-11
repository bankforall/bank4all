import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? (<UserDashboardPage/>) : (<LoginPage/>)} />
      </Routes>
    </BrowserRouter>

  );
}

export default App
