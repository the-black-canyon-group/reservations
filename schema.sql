DROP DATABASE IF EXISTS airbnb;

CREATE DATABASE airbnb;

USE DATABASE airbnb;

CREATE TABLE homestays (
  id INTEGER AUTO_INCREMENT,
  price INTEGER,
  max_guests INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE reservations (
  id INTEGER AUTO_INCREMENT,
  start_date DATE,
  end_date DATA,
  number_of_guests INTEGER,
  cleaning_fee INTEGER,
  service_fee INTEGER,
  occupancy_fee INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id)
    REFERENCES homestays(id)
    ON DELETE CASCADE
);

CREATE TABLE page_views (
  id INTEGER AUTO_INCREMENT,
  homestay_id INTEGER,
  view_date DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (homestay_id)
    REFERENCES homestays(id)
    ON DELETE CASCADE
)

CREATE TABLE reviews (
  id INTEGER AUTO_INCREMENT,
  homestay_id INTEGER,
  stars INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (homestay_id)
    REFERENCES homestays(id)
    ON DELETE CASCADE
)