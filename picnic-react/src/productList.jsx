const ProductList = ({ products = [] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>
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
              />
            ) : (
              <div
                className="card-img-top d-flex align-items-center justify-content-center bg-light"
                style={{ height: '200px' }}
              >
                <span className="text-muted">No Image</span>
              </div>
            )}

            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                €{Number(product.price ?? 0).toFixed(2)}
              </p>
              <p className="card-text">
                {product.description || 'No description available'}
              </p>
              {/* <a href="#" className="btn btn-primary">Add to Cart</a> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
