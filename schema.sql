DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

USE reservations;

CREATE TABLE homestays (
  id INTEGER AUTO_INCREMENT,
  price INTEGER,
  max_guests INTEGER,
  cleaning_fee INTEGER,
  service_fee INTEGER,
  occupancy_fee INTEGER,
  page_views INTEGER,
  average_review DECIMAL(2,1),
  PRIMARY KEY (id)
);

CREATE TABLE reservations (
  id INTEGER AUTO_INCREMENT,
  homestay_id INTEGER,
  date DATE,
  number_of_guests INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (homestay_id)
    REFERENCES homestays(id)
    ON DELETE CASCADE
);