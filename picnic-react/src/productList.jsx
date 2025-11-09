const ProductList = ({ products = [], cartQuantities = {}, setCartQuantities }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>
  }

  const updateCartAPI = (productId, newQty) => {
    const token = localStorage.getItem('token')

    fetch(`http://localhost:8081/api/cart/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQty)
    })
    .then(r => {
      if (!r.ok) {
        throw new Error('Failed to update cart')
      }
      return r.json()
    })
    .catch(e => console.error('Error updating cart:', e))
  }

  const handleIncrement = (productId) => {
    const newQty = (cartQuantities[productId] || 0) + 1
    setCartQuantities(prev => ({
      ...prev,
      [productId]: newQty
    }))
    updateCartAPI(productId, newQty)
  }

  const handleDecrement = (productId) => {
    const newQty = Math.max(0, (cartQuantities[productId] || 0) - 1)
    setCartQuantities(prev => ({
      ...prev,
      [productId]: newQty
    }))
    updateCartAPI(productId, newQty)
  }

  return (
    <div className="row">
      {products.map((product) => (
        <div
          className="col-lg-4 col-md-6 col-sm-12 mb-4"
          key={product.id}
        >
          <div className="card h-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            ) : (
              <div
                className="card-img-top d-flex align-items-center justify-content-center bg-light"
                style={{ height: '200px' }}
              >
                <span className="text-muted">No Image</span>
              </div>
            )}

            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-3">{product.name}</h5>
              <p className="text-muted small mb-3" style={{ flexGrow: 1 }}>
                {product.description || 'No description available'}
              </p>

              <div className="mb-3">
                <span className="text-primary fw-bold fs-4">
                  €{Number(product.price ?? 0).toFixed(2)}
                </span>
              </div>

              <div className="mt-auto border-top pt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted small">Quantity:</span>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleDecrement(product.id)}
                      style={{ width: '32px', height: '32px' }}
                    >
                      -
                    </button>
                    <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                      {cartQuantities[product.id] || 0}
                    </span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleIncrement(product.id)}
                      style={{ width: '32px', height: '32px' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
