CREATE DATABASE rentohome DEFAULT CHARACTER SET utf8;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    password VARCHAR(255),
    google_id VARCHAR(255) UNIQUE
);

CREATE TABLE homes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    square VARCHAR(10) NOT NULL,
    class VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    user INT NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    originalName VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    home INT NOT NULL,
    FOREIGN KEY (home) REFERENCES homes(id)
);

CREATE TABLE refreshTokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token TEXT NOT NULL,
    user INT NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id)
);


CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  home_id INT NOT NULL,
  user_id INT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (home_id) REFERENCES homes(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


