-- Create ENUM types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create customers table
DROP TABLE IF EXISTS booking_status_history CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS service_packages CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(120),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create service_packages table
CREATE TABLE service_packages (
  id BIGSERIAL PRIMARY KEY,
  package_name VARCHAR(120) NOT NULL,
  description VARCHAR(500),
  duration_minutes INTEGER NOT NULL DEFAULT 120,
  base_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  is_active SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  service_package_id BIGINT NOT NULL,
  service_address VARCHAR(255) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  number_of_rooms INTEGER NOT NULL DEFAULT 1,
  notes VARCHAR(1000),
  status booking_status NOT NULL DEFAULT 'pending',
  total_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (service_package_id) REFERENCES service_packages(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Create booking_status_history table
CREATE TABLE booking_status_history (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL,
  old_status booking_status,
  new_status booking_status NOT NULL,
  changed_by VARCHAR(120),
  note VARCHAR(500),
  changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_service_package_id ON bookings(service_package_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_preferred_date ON bookings(preferred_date);
CREATE INDEX idx_booking_status_history_booking_id ON booking_status_history(booking_id);

-- Insert initial service packages
INSERT INTO service_packages (package_name, description, duration_minutes, base_price, is_active)
VALUES
  ('Dọn cơ bản', 'Dọn phòng khách, bếp, nhà vệ sinh và các khu vực sinh hoạt chính.', 120, 250000.00, 1),
  ('Dọn sâu', 'Dọn chi tiết toàn bộ căn nhà, phù hợp sau sửa chữa hoặc trước khi chuyển nhà.', 240, 450000.00, 1),
  ('Dọn theo giờ', 'Dọn linh hoạt theo số giờ khách hàng yêu cầu.', 60, 120000.00, 1);
