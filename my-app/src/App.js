import logo from './logo.svg';
import './App.css';
import Dashboard from "./dashboard/dashboard";
import Login from "./login/login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Dashboard></Dashboard>
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
