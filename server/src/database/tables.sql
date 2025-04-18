CREATE DATABASE rentohome DEFAULT CHARACTER SET utf8;
USE rentohome;

-- ---------- users ----------
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    password VARCHAR(255),
    google_id VARCHAR(255) UNIQUE
);

-- ---------- homes ----------
CREATE TABLE homes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    square VARCHAR(10) NOT NULL,
    class VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    user_id INT NOT NULL,                         
    FOREIGN KEY (user_id) REFERENCES users(id)        
        ON DELETE CASCADE
);

-- ---------- images ----------
CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    originalName VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    home_id INT NOT NULL,
    FOREIGN KEY (home_id) REFERENCES homes(id)
        ON DELETE CASCADE                             
);

-- ---------- refresh tokens ----------
CREATE TABLE refreshTokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE                             
);

-- ---------- comments ----------
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    home_id INT NOT NULL,
    user_id INT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (home_id) REFERENCES homes(id)
        ON DELETE CASCADE,                           
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE                             
);

-- ---------- likes ----------
CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    home_id INT NOT NULL,
    user_id INT NOT NULL,
    UNIQUE KEY unique_like (home_id, user_id),
    FOREIGN KEY (home_id) REFERENCES homes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
