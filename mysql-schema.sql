CREATE DATABASE IF NOT EXISTS house_cleaning_booking
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE house_cleaning_booking;

DROP TABLE IF EXISTS booking_status_history;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS service_packages;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(120) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_customers_phone (phone)
) ENGINE=InnoDB;

CREATE TABLE service_packages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  package_name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NULL,
  duration_minutes INT UNSIGNED NOT NULL DEFAULT 120,
  base_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE bookings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  service_package_id BIGINT UNSIGNED NOT NULL,
  service_address VARCHAR(255) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  number_of_rooms INT UNSIGNED NOT NULL DEFAULT 1,
  notes VARCHAR(1000) NULL,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  total_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_bookings_customer_id (customer_id),
  KEY idx_bookings_service_package_id (service_package_id),
  KEY idx_bookings_status (status),
  KEY idx_bookings_preferred_date (preferred_date),
  CONSTRAINT fk_bookings_customer
    FOREIGN KEY (customer_id) REFERENCES customers (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_bookings_service_package
    FOREIGN KEY (service_package_id) REFERENCES service_packages (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE booking_status_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booking_id BIGINT UNSIGNED NOT NULL,
  old_status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NULL,
  new_status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL,
  changed_by VARCHAR(120) NULL,
  note VARCHAR(500) NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_status_history_booking_id (booking_id),
  CONSTRAINT fk_booking_status_history_booking
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO service_packages (package_name, description, duration_minutes, base_price, is_active)
VALUES
  ('Dọn cơ bản', 'Dọn phòng khách, bếp, nhà vệ sinh và các khu vực sinh hoạt chính.', 120, 250000.00, 1),
  ('Dọn sâu', 'Dọn chi tiết toàn bộ căn nhà, phù hợp sau sửa chữa hoặc trước khi chuyển nhà.', 240, 450000.00, 1),
  ('Dọn theo giờ', 'Dọn linh hoạt theo số giờ khách hàng yêu cầu.', 60, 120000.00, 1);