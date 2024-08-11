create database social_network;
use social_network;
CREATE TABLE users (
id VARCHAR(255) PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
id VARCHAR(255) PRIMARY KEY,
roomId VARCHAR(255) NOT NULL ,
username VARCHAR(255) NOT NULL ,
message VARCHAR(255) ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id VARCHAR(30)  PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(Id) ON DELETE CASCADE
);

CREATE TABLE activity_logs (
    id VARCHAR(255)  PRIMARY KEY,
    user_id VARCHAR(255),
    action ENUM('create', 'update', 'delete') NOT NULL,
    task_id VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);