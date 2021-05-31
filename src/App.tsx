import './App.css';
import { Quizpage, Homepage, Scoreboard, Report, Login, SignUp } from './pages/index'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/quiz' element={<Quizpage />} />
        <Route path='/report' element={<Report />} />
        <Route path='/scoreboard' element={<Scoreboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
