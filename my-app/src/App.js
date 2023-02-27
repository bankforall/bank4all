import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { UserDashboardPage } from './pages/UserDashboardPage';


function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <LoginPage />
      <UserDashboardPage />
    </div>
  );
}

export default App;
