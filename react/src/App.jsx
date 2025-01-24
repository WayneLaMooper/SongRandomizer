import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loginStatus, setLoginStatus] = useState('false')

  // Upon refresh of page check if user is logged in or not
  useEffect(() => {
    // Retrieve login status of current user from backend
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');

    if (success === 'true') {
      setLoginStatus('true');
    } else if (error) {
      setLoginStatus('false');
    }
  }, []);

  const handleLoginClick = async () => {
    // Send a request to Flask to initiate the OAuth flow
    try {
      const response = await fetch('/api/login', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect the user to the OAuth provider's login page
        window.location.href = data.auth_url;
      } else {
        console.error('Failed to get OAuth URL');
      }
    } catch (error) {
      console.error('Error initiating OAuth:', data);
    }
  };

  const LoginPage = (prop) => {
    if (prop.loginStatus === 'false') {
      return (
        <div className="card">
          <button onClick={handleLoginClick}>
            Login
          </button>
        </div>
      )
    }
    return (
      <div>
        Logged in!
      </div>
    )
  }

  return (
    <>
      <LoginPage loginStatus={loginStatus}/>
    </>
  )
}

export default App
