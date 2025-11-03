# E-Commerce Application - Modern Online Store Platform

A full-stack e-commerce application built with Spring Boot and React, featuring a modern microservices architecture with Docker containerization.

## Overview

This is a comprehensive online store platform that provides a seamless shopping experience with secure authentication, product management, and shopping cart functionality. The application follows modern development practices with a RESTful API backend and a responsive React frontend.

## Tech Stack

### Backend
- **Spring Boot 3.5.5** - Modern Java framework
- **Java 21** - Latest LTS version
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Spring Data JPA** - Database abstraction
- **MySQL 8.0** - Production database
- **H2 Database** - Development/testing
- **Lombok** - Reduces boilerplate code
- **Maven** - Dependency management

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **React Bootstrap** - UI component library
- **Bootstrap 5.3** - Responsive design framework

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Frontend web server

## Features

### Current Features

#### Authentication & Authorization
- JWT-based authentication system
- Role-based access control (USER and ADMIN roles)
- Secure password handling with Spring Security
- Protected routes on frontend

#### Product Management
- Browse product catalog
- Filter products by category
- Admin-only product CRUD operations:
  - Create new products
  - Update existing products
  - Delete products
- Category management system

#### Shopping Cart
- Add products to cart
- Update product quantities
- Remove items from cart
- Persistent cart storage
- Real-time cart updates

#### User Interface
- Responsive design for all devices
- Protected routes for authenticated users
- Admin dashboard for store management
- Intuitive product catalog
- Seamless login experience

### Architecture

```
ecommerce-app/
├── backend/                    # Spring Boot Application
│   ├── controller/            # REST API endpoints
│   ├── service/               # Business logic layer
│   ├── repository/            # Data access layer
│   ├── model/                 # JPA entities
│   ├── jwt/                   # JWT utilities and filters
│   └── config/                # Security and app configuration
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.jsx           # Main application
│   │   ├── Login.jsx         # Authentication
│   │   ├── Catalog.jsx       # Product listing
│   │   ├── Cart.jsx          # Shopping cart
│   │   └── AdminDashboard.jsx # Admin panel
│   └── Dockerfile            # Frontend container config
│
└── docker-compose.yml         # Multi-container setup
```

## Getting Started

### Prerequisites
- Docker and Docker Compose (recommended)
- OR:
  - Java 21
  - Node.js 18+
  - MySQL 8.0
  - Maven 3.6+

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-web-app
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8080
   - MySQL: localhost:3307

4. **Default credentials**
   - Username: `admin`
   - Password: `pass@123`

### Manual Setup

#### Backend Setup

1. **Configure MySQL**
   ```bash
   mysql -u root -p
   CREATE DATABASE ecommerce;
   ```

2. **Update application.properties**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. **Run the backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API endpoint**
   Update `src/config.js` with your backend URL

3. **Start development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login

### Products
- `GET /api/products` - Get all products (authenticated)
- `GET /api/products/category/{id}` - Get products by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/{id}` - Update category (admin only)
- `DELETE /api/categories/{id}` - Delete category (admin only)

### Shopping Cart
- `GET /api/cart` - Get cart items
- `PUT /api/cart/product/{productId}` - Add/update item in cart
- `DELETE /api/cart/{cartId}` - Remove item from cart

## Roadmap

### Upcoming Features

#### Phase 1 - Order Management (In Progress)
- [ ] Complete checkout functionality
- [ ] Order creation and processing
- [ ] Order history for users
- [ ] Order status tracking
- [ ] Admin order management dashboard

#### Phase 2 - Payment Integration
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Multiple payment methods support
- [ ] Payment history and receipts
- [ ] Refund processing

#### Phase 3 - Enhanced User Experience
- [ ] User registration and profile management
- [ ] Email notifications for orders
- [ ] Product search and advanced filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Product recommendations

#### Phase 4 - Advanced Features
- [ ] Inventory management system
- [ ] Multi-language support
- [ ] Analytics dashboard for admins
- [ ] Discount codes and promotions
- [ ] Image upload for products
- [ ] Order export functionality

#### Phase 5 - Performance & Scalability
- [ ] Redis caching layer
- [ ] CDN integration for assets
- [ ] Database optimization and indexing
- [ ] API rate limiting
- [ ] Comprehensive testing suite
- [ ] CI/CD pipeline setup

## Development

### Code Structure

#### Backend Layers
1. **Controller Layer** - Handles HTTP requests and responses
2. **Service Layer** - Contains business logic
3. **Repository Layer** - Database operations with Spring Data JPA
4. **Model Layer** - JPA entities and data models
5. **Security Layer** - Authentication and authorization

#### Frontend Structure
- Component-based architecture
- Protected routing for authenticated pages
- Centralized configuration
- Responsive layouts with Bootstrap

### Running Tests

```bash
# Backend tests
mvn test

# Frontend tests
cd frontend
npm run test
```

### Building for Production

```bash
# Build all services
docker-compose up --build

# Or build individually
# Backend
mvn clean package

# Frontend
cd frontend
npm run build
```

## Contributing

Contributions are welcome! This is a learning project focused on building a modern full-stack e-commerce platform.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is a learning project and is open for educational purposes.

## Acknowledgments

- Built as a learning project to explore modern full-stack development
- Spring Boot and React communities for excellent documentation
- Docker for simplifying deployment

---

**Status**: 🚧 Active Development

Made with Java and React
