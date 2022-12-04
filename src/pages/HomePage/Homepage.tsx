import './homepage.css'
import IplLogo from './img/ipl-logo.png'
import MarvelLogo from './img/marvel-logo.png'
import ReactLogo from './img/react-logo.png'
import ScoreLogo from './img/score-logo.png'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useAuth } from '../../Context/AuthProvider'
export function Homepage() {
    const { isUserLogin } = useAuth()
    const navigate = useNavigate()
    return (
        <div className='home'>
            <h1 className='heading-home'>Quizzards of Oz</h1>
            {
                isUserLogin ?
                    <Link to="/user">
                        <div className="avatar-circleIcon">
                            <span><i className="fas fa-user"></i></span>
                        </div>
                    </Link>
                    : <Link to="/login">
                        <button className="btn-login">Login</button>
                    </Link>
            }

            <div className="choosebox">
                <div className='selectbox' onClick={() => navigate('/quiz?page=ipl')}>
                    <img src={IplLogo} className='logo' alt='ipl' />
                    <h3>Ipl Quiz</h3>
                </div>
                <div className='selectbox' onClick={() => navigate('/quiz?page=marvel')}>
                    <img src={MarvelLogo} className='logo' alt='marvel' />
                    <h3>Marvel Quiz</h3>
                </div>
                <div className='selectbox' onClick={() => navigate('/quiz?page=react')}>
                    <img src={ReactLogo} className='logo' alt='react' />
                    <h3>React Quiz</h3>
                </div>
                <div className='selectbox' onClick={() => navigate('/scoreboard')}>
                    <img src={ScoreLogo} className='logo' alt='score' />
                    <h3>Scoreboard</h3>
                </div>
            </div>
        </div>
    );
}