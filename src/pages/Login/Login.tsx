import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpasswordState, setPassState] = useState(false)
    const [errorState, setErrorState] = useState(false);
    // async function loginHandler(e, email, password) {
    //     e.preventDefault()
    //     const response = await loginUserWithCredentials(email, password)
    //     if (response.success)
    //         navigate("/")
    //     else {
    //         setEmail('');
    //         setPassword('')
    //         setErrorState(true);
    //     }
    // }
    return (
        <div className="Login-container">
            <form className="Login-box"
            // onSubmit={(e) => loginHandler(e, email, password)}
            >
                <div className="heading-div">
                    <h1 className="white">Log </h1>
                    <h1 className="color">IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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