import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('')
  const [playlists, setPlaylists] = useState([])

  // Upon refresh of page check if user is logged in or not
  useEffect(() => {

    getLoginStatus()
    getCurrentTrack()
    getPlaylists()

  }, [])

  const handleLoginClick = async () => {
    // Send a request to Flask to initiate the OAuth flow
    try {
      const response = await fetch('/api/login', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect the user to the OAuth provider's login page
        window.location.href = data.auth_url
      } else {
        console.error('Failed to get OAuth URL')
      }
    } catch (error) {
      console.error('Error initiating OAuth:', data)
    }
  }

  const getLoginStatus = () => {
        // Retrieve login status of current user from backend
        const params = new URLSearchParams(window.location.search)
        const success = params.get('success')
        const error = params.get('error')
    
        if (success === 'true') {
          setLoginStatus(true)
        } else if (error) {
          setLoginStatus(false)
        }
  }

  const getCurrentTrack = async () => {
    // Send a request to Flask to retrieve current track
    try {
      const response = await fetch('/api/current_track', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentTrack(data.name)
      } else {
        console.error('Failed to get current track')
      }
    } catch (error) {
      console.error('Error getting current track:', data)
    }
  }

  const getPlaylists = async () => {
    // Send a request to Flask to retrieve current track
    try {
      const response = await fetch('/api/playlists', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setPlaylists(data.items)
      } else {
        console.error('Failed to get current track')
      }
    } catch (error) {
      console.error('Error getting current track:', data)
    }
  }

  // Conditional rendering of page based on login status
  const LoginPage = ({loginStatus}) => {
    // If not logged in
    if (loginStatus === false) {
      return (
        <div className="card">
          <button onClick={handleLoginClick}>
            Login
          </button>
        </div>
      )
    }
    // If logged in
    return (
      <LoggedInPage />
    )
  }

  const LoggedInPage = () => {
    if (playlists.length === 0) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div>
        Logged in!
        {currentTrack}
        {playlists[0].name}
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
