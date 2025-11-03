import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import ProductList from './productList.jsx'

function Catalog() {
  const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [cartQuantities, setCartQuantities] = useState({})

  const [selectedCategory, setSelectedCategory] = useState(null) // store as string from <select>
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('asc')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    fetch('http://localhost:8080/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.status === 401) {
          handleLogout()
          throw new Error('Unauthorized')
        }
        return r.json()
      })
      .then((data) => {
        setAllProducts(data ?? [])
        setFilteredProducts(data ?? [])
      })
      .catch((e) => console.error('Error fetching products:', e))

    fetch('http://localhost:8080/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.status === 401) {
          handleLogout()
          throw new Error('Unauthorized')
        }
        return r.json()
      })
      .then((data) => setCategories(data ?? []))
      .catch((e) => console.error('Error fetching categories:', e))

    // Fetch cart items to get current quantities
    fetch('http://localhost:8080/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.status === 401) {
          handleLogout()
          throw new Error('Unauthorized')
        }
        return r.json()
      })
      .then((data) => {
        const quantities = {}
        data.forEach(item => {
          quantities[item.product.id] = item.quantity
        })
        setCartQuantities(quantities)
      })
      .catch((e) => console.error('Error fetching cart:', e))
  }, [])

  useEffect(() => {
    const selectedId = selectedCategory ? Number(selectedCategory) : null
    let filtered = [...allProducts]

    // 1) Category filter
    if (selectedId !== null && !Number.isNaN(selectedId)) {
      filtered = filtered.filter((p) => {
        const pid = p?.category?.id ?? p?.categoryId
        return Number(pid) === selectedId
      })
    }

    // 2) Search filter (safe against nulls)
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      filtered = filtered.filter((p) => {
        const name = (p?.name ?? '').toLowerCase()
        const desc = (p?.description ?? '').toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    }

    // 3) Sort numerically
    filtered.sort((a, b) => {
      const ap = Number(a?.price ?? 0)
      const bp = Number(b?.price ?? 0)
      return sortOption === 'asc' ? ap - bp : bp - ap
    })

    setFilteredProducts(filtered)
  }, [allProducts, selectedCategory, searchTerm, sortOption])

  const handleSortChange = (e) => setSortOption(e.target.value)
  const handleCategorySelect = (e) => setSelectedCategory(e.target.value || null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    navigate('/login')
  }


  return (
    <div>
      <nav className="navbar navbar-light bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Ecomm Products</span>
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, {localStorage.getItem('username')}</span>
            {localStorage.getItem('role') === 'ROLE_ADMIN' && (
              <button className="btn btn-outline-secondary btn-sm me-2 d-flex align-items-center gap-1" onClick={() => navigate('/admin')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                <span>Admin</span>
              </button>
            )}
            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate('/cart')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              Cart
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
      <div className="row align-items-center mb-4">
        <div className="col-md-4 mb-2">
          <p>Filter by Category:</p>
          <select
            className="form-select"
            value={selectedCategory || ''}
            onChange={handleCategorySelect}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <p>Search Products:</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <p>Sort by Price:</p>
          <select
            className="form-select"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <ProductList products={filteredProducts} cartQuantities={cartQuantities} setCartQuantities={setCartQuantities} />
      </div>
    </div>
  )
}

export default Catalog
