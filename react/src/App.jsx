import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleLoginClick}>
          Login
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
