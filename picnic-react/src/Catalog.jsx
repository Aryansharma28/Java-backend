import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import ProductList from './productList.jsx'

function Catalog() {
  const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])

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
          <span className="navbar-brand mb-0 h1">Picnic Products</span>
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, {localStorage.getItem('username')}</span>
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

      <ProductList products={filteredProducts} />
      </div>
    </div>
  )
}

export default Catalog
