import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const data = await response.json()

      // Store token and user info in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('role', data.role)

      // Redirect based on role
      if (data.role === 'ROLE_ADMIN') {
        navigate('/admin')
      } else {
        navigate('/catalog')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{
      background: '#f8f9fa'
    }}>
      <div className="w-100">
        <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Logo/Icon */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                       style={{
                         width: '80px',
                         height: '80px',
                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                       }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>Welcome to Picnic</h2>
                  <p className="text-muted">Sign in to continue</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 py-2"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                        style={{ fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                        </svg>
                      </span>
                      <input
                        type="password"
                        className="form-control border-start-0 py-2"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={{ fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 text-white fw-semibold py-2 rounded-3 border-0"
                    disabled={loading}
                    style={{
                      background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-4 border-top">
                  <div className="text-center">
                    <p className="text-muted small mb-2 fw-semibold">Demo Credentials</p>
                    <div className="d-flex justify-content-around">
                      <div className="text-center">
                        <div className="badge bg-light text-dark mb-1" style={{ fontSize: '0.75rem' }}>User</div>
                        <p className="small mb-0" style={{ color: '#718096' }}>user1 / up1</p>
                      </div>
                      <div className="text-center">
                        <div className="badge bg-light text-dark mb-1" style={{ fontSize: '0.75rem' }}>Admin</div>
                        <p className="small mb-0" style={{ color: '#718096' }}>admin / ap1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Login
