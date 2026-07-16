import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';

export default function Login(props) {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  
  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up inputs
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      // Commented out the cloud environment URL
      // const url = 'https://hospital-management-backend-6o6v.onrender.com/api/auth/login';
      
      // Target your local machine backend running in STS
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: signInEmail,
        password: signInPassword
      });
      
      localStorage.setItem('isAuthenticated', 'true');
      props.onLoginSuccess(); 
    } catch (error) {
      alert('Authentication Failed: Invalid credentials or account does not exist.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Commented out the cloud environment URL
      // const url = 'https://hospital-management-backend-6o6v.onrender.com/api/auth/register';
      
      // Target your local machine backend running in STS
      await axios.post('http://localhost:8080/api/auth/register', {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword
      });
      alert('Account successfully created! Sliding back to Sign In panel...');
      setIsSignUpActive(false); 
    } catch (error) {
      alert('Registration failed. Try using a different email.');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className={`container ${isSignUpActive ? 'active' : ''}`} id="container">
        
        {/* CREATE ACCOUNT PANEL */}
        <div className="login-container sign-up">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} required />
            <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* SIGN IN PANEL */}
        <div className="login-container sign-in">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
            <a href="#">Forget your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* SLIDING INTERACTION OVERLAY CLOSURES */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button type="button" className="hidden" id="login" onClick={() => setIsSignUpActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button type="button" className="hidden" id="register" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}