import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alert/AlertState';


function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert message="This is amazing notebook." />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />}> </Route>
                <Route exact path="/about" element={<About />}> </Route>
                <Route exact path="/login" element={<Login />}> </Route>
                <Route exact path="/signup" element={<Signup />}> </Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>

    </>
  );
}

export default App;
