-- Step 1: Create the database
CREATE DATABASE task_swapping_app;

-- Use the newly created database
USE task_swapping_app;

-- Step 2: Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location VARCHAR(100),
    bio TEXT,
    rating DECIMAL(3, 2) DEFAULT 0, -- average rating from tasks
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create the Communities table
CREATE TABLE Communities (
    community_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Step 4: Create the Tasks table
CREATE TABLE Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    posted_by INT NOT NULL,
    offered_task TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    community_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES Communities(community_id) ON DELETE SET NULL
);

-- Step 5: Create the Community Members table
CREATE TABLE CommunityMembers (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    community_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES Communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Step 6: Create the Task Swaps table
CREATE TABLE TaskSwaps (
    swap_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    offered_by INT NOT NULL,
    accepted_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (offered_by) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (accepted_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Step 7: Create the Ratings table
CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    rated_user INT NOT NULL,
    rating_value INT CHECK (rating_value BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (rated_user) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Step 8: Create the Notifications table (Optional for tracking user notifications)
CREATE TABLE Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Step 9: Create indexes for optimization
CREATE INDEX idx_tasks_posted_by ON Tasks (posted_by);
CREATE INDEX idx_community_members_user_id ON CommunityMembers (user_id);
CREATE INDEX idx_task_swaps_task_id ON TaskSwaps (task_id);
CREATE INDEX idx_ratings_rated_user ON Ratings (rated_user);
