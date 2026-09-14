CREATE DATABASE IF NOT EXISTS defaultdb;
USE defaultdb;

-- Users Table (Matches authentication requirements)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Table (Matches catalog and equipment management data)
CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    daily_rate DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table (Matches customer & admin booking management data)
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    equipment_id INT NOT NULL,
    equipment_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    stripe_session_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
);

-- Seed Initial Equipment Data
INSERT INTO equipment (name, category, daily_rate, status, image_url) VALUES
('Wolf Garten Battery Mower', 'Agriculture', 500.00, 'Available', 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=400&q=80'),
('Wolf Garten TT 350S Seeder', 'Agriculture', 100.00, 'Available', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80'),
('Agriculture Manual Seeder', 'Agriculture', 200.00, 'Available', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'),
('Heavy Duty Lawn Rake', 'Agriculture', 200.00, 'Available', 'https://images.unsplash.com/photo-1617575521317-8602235b603e?auto=format&fit=crop&w=400&q=80'),
('Canon EOS 80D DSLR Camera', 'Photography', 850.00, 'Available', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'),
('Epson Full HD Projector', 'AudioVisual', 1200.00, 'Available', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80');

-- Seed Initial Booking Data
INSERT INTO bookings (id, customer_name, equipment_id, equipment_name, start_date, end_date, total_cost, status) VALUES
('BK-1001', 'Himani Kamerkar', 1, 'Wolf Garten Battery Mower', '2026-09-05', '2026-09-07', 1000.00, 'Pending'),
('BK-1002', 'Rahul Sharma', 5, 'Canon EOS 80D DSLR Camera', '2026-09-10', '2026-09-12', 1700.00, 'Approved');