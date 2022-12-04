import './App.css';
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Quizpage, Homepage, Scoreboard, Report, Login, SignUp, Userdetails } from './pages/index'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/quiz' element={<Quizpage />} />
        <Route path='/report' element={<Report />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <PrivateRoute path='/scoreboard' element={<Scoreboard />} />
        <PrivateRoute path='/user' element={<Userdetails />} />
      </Routes>
    </div>
  );
}

export default App;
