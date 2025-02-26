import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [refresh, setRefresh] = useState(false)

  // Upon refresh of page check if user is logged in or not
  useEffect(() => {
    // Check the success flag in URL before calling any APIs
    // If access or refresh token is not found, API calls will setLoginStatus to false, but getLoginStatus will not be executed to overwrite this action
    getLoginStatus()

    // Check if token needs to be refreshed according to previous API calls to backend
    if (refresh === true) {
      refreshToken()
    }
    getCurrentTrack()
    getPlaylists()

    // When token is refreshed, redo any API calls that may have failed
  }, [refresh])

  const refreshToken = () => {
    // Refresh token via call to backend API
    fetch('/api/refresh-token')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error connecting to token refresh api')
        }
        return response.json()
      })
      .then(data => {
        if (data.refreshed === true) {
          setRefresh(false)
        }
      })
      .catch(error => {
        console.error('Error refreshing token:', error)
      })
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

  const getCurrentTrack = () => {
    // Send a request to Flask to retrieve current track
    fetch('/api/current_track')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error connecting to current track api')
        }
        return response.json()
      })
      .then(data => {
        // data.redirect is only present if there is no access or refresh token, then load login page
        if (data.redirect) {
          setLoginStatus(false)
        } else if (data.refresh) {
          setRefresh(true)
        }
        setCurrentTrack(data.name)
      })
      .catch(error => {
        console.error('Error retrieving current track:', error)
      })
  }

  const getPlaylists = () => {
    // Send a request to Flask to retrieve all playlists
    fetch('/api/all_playlists')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error connecting to all playlists api')
        }
        return response.json()
      })
      .then(data => {
        if (data.redirect) {
          setLoginStatus(false)
        } else if (data.refresh) {
          setRefresh(true)
        }
        setPlaylists(data.items)
      })
      .catch(error => {
        console.error('Error retrieving playlists:', error)
      })
  }

  const handleLoginClick = async () => {
    // Send a request to Flask to initiate the OAuth flow by first receiving a link to redirect to Spotify
    fetch('/api/login')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error connecting to login api')
        }
        return response.json()
      })
      .then(data => {
        window.location.href = data.auth_url
      })
      .catch(error => {
        console.error('Error retrieving login redirect:', error)
      })
  }

  const handleShuffleClick = () => {
    fetch('/api/playlist')
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
        <LoadingPage/>
      )
    }
    return (
      <div>
        Logged in! <br/>
        Now Playing: {currentTrack} <br/>
        Playlists: <br/>
        <ul>
          {playlists.map(playlist =>
             <li key={playlist.id}>
                {playlist.name} <br/>
                <button onClick={()=>handleShuffleClick()}>
                  Shuffle
                </button>
              </li>)}
        </ul>
      </div>
    )
  }

  const LoadingPage = () => {
    if (refresh === true) {
      return (
        <div>
          Refreshing Data...
        </div>
      )
    }
    return (
      <div>
        Loading...
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
