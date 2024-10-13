import ballerina/time;

    // user_id INT AUTO_INCREMENT PRIMARY KEY,
    // username VARCHAR(100) NOT NULL,
    // email VARCHAR(100) UNIQUE NOT NULL,
    // password_hash VARCHAR(255) NOT NULL,
    // location VARCHAR(100),
    // bio TEXT,
    // rating DECIMAL(3, 2) DEFAULT 0, -- average rating from tasks
    // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

type User record {|
    int user_id;
    string username;
    string email;
    string password_hash;
    string location;
    string bio;
    decimal rating;
    time:Utc created_at;
|};

type CreateUserRequest record {|
    string username;
    string email;
    string password_hash;
    string location;
    string bio;
|};

type UpdateUserRequest record {|
    string username;
    string email;
    string location;
    string bio;
|};
