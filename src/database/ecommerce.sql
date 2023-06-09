-- Active: 1680181883588@@127.0.0.1@3306

DROP TABLE products;
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category ENUM NOT NULL,
    image TEXT NOT NULL
);
DROP TABLE users;
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role ENUM NOT NULL
);

CREATE TABLE purchase (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM users;
