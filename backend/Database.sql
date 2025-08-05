-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GUEST USERS TABLE
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    session_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADDRESSES
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    guest_id INT REFERENCES guests(id) ON DELETE SET NULL,
    address_line TEXT NOT NULL,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE
);

-- PRODUCTS
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INVENTORY
CREATE TABLE inventory (
    product_id INT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL
);

-- ORDERS
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    guest_id INT REFERENCES guests(id) ON DELETE SET NULL,
    address_id INT REFERENCES addresses(id),
    status VARCHAR(50) DEFAULT 'pending', -- e.g., pending, shipped, delivered, cancelled
    total_price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

-- PAYMENTS
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    payment_method VARCHAR(50), -- e.g., credit_card, cod, etc.
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
    paid_at TIMESTAMP
);

-- CANCELLATIONS
CREATE TABLE cancellations (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    reason TEXT,
    cancelled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RIDERS
CREATE TABLE riders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    is_available BOOLEAN DEFAULT TRUE
);

-- DELIVERIES
CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    rider_id INT REFERENCES riders(id),
    delivery_status VARCHAR(50) DEFAULT 'assigned', -- assigned, in_transit, delivered
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP
);
