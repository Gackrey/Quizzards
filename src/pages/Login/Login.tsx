import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider'
export const Login = () => {
    const { loginUserWithCredentials } = useAuth()
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showpasswordState, setPassState] = useState(false)
    const [errorState, setErrorState] = useState(false);
    function autoLogin() {
        setUsername("Test123");
        setPassword("Qwerty123");
    }
    async function loginHandler(e: any, username: string, password: string) {
        e.preventDefault()
        const response = await loginUserWithCredentials(username, password)
        if (response.success)
            navigate("/")
        else {
            setUsername('');
            setPassword('')
            setErrorState(true);
        }
    }
    return (
        <div className="Login-container">
            <form className="Login-box"
                onSubmit={(e) => loginHandler(e, username, password)}
            >
                <div className="heading-div">
                    <h1 className="white">Log </h1>
                    <h1 className="color">IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" required value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </div>
                </div>
                <button type="submit" className="login-click-btn">Log In</button>
                <br />
                <button type="button" className="login-click-btn" onClick={autoLogin}>Test user</button>
                <p className="small-desc">Dont have a account?
                    <Link to="/signup" className="moveto-signup">
                        Sign Up</Link>
                </p>
                {errorState ? "" : <br />}
                <p className="error" style={{
                    display: errorState ? "block" : "none",
                }}>Wrong email or password entered</p>
            </form>
        </div>
    );
}