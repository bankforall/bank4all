import logo from './logo.svg';
import './App.css';
import Dashboard from "./dashboard/dashboard";
import Login from "./login/login";
import UserInformation from "./userInformation/userInformation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserInformation></UserInformation>
      </header>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
