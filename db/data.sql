-- Insert mock users
INSERT INTO Users (username, email, password_hash, location, bio, rating)
VALUES 
('Alice', 'alice@example.com', 'hashedpassword1', 'New York', 'Love helping others', 4.5),
('Bob', 'bob@example.com', 'hashedpassword2', 'Los Angeles', 'Skilled in electronics', 4.0),
('Charlie', 'charlie@example.com', 'hashedpassword3', 'Chicago', 'Enjoys fixing things', 3.8),
('Diana', 'diana@example.com', 'hashedpassword4', 'Miami', 'Excellent at organizing', 4.2);

-- Insert mock communities
INSERT INTO Communities (name, description, location, created_by)
VALUES 
('Green Volunteers', 'A community focused on eco-friendly activities', 'New York', 1),
('Tech Helpers', 'A group for people interested in fixing and building tech gadgets', 'Los Angeles', 2);

-- Insert mock tasks
INSERT INTO Tasks (title, description, posted_by, offered_task, status, community_id)
VALUES 
('Fix my bicycle', 'Need someone to repair a flat tire', 1, 'Help with moving boxes', 'Open', NULL),
('Organize a garage sale', 'Need help setting up tables and organizing items', 4, 'Assist with tech setup', 'Open', 1),
('Set up a home network', 'Need help setting up a secure Wi-Fi network', 2, 'Free home-baked cookies', 'Open', 2);

-- Insert mock community memberships
INSERT INTO CommunityMembers (community_id, user_id, joined_at)
VALUES 
(1, 1, CURRENT_TIMESTAMP),
(1, 4, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP);

-- Insert mock task swaps
INSERT INTO TaskSwaps (task_id, offered_by, accepted_by)
VALUES 
(1, 1, 3), -- Alice offers to fix Bob’s bicycle
(2, 4, 1), -- Diana offers to help Alice organize a garage sale
(3, 2, NULL); -- Bob offers his help but hasn't been accepted yet

-- Insert mock ratings
INSERT INTO Ratings (task_id, rated_user, rating_value, feedback)
VALUES 
(1, 3, 5, 'Did a great job fixing my bike!'),
(2, 1, 4, 'Organized everything efficiently!'),
(3, 2, 5, 'Set up the network perfectly.');

-- Insert mock notifications (optional)
INSERT INTO Notifications (user_id, message)
VALUES 
(1, 'Your task has been accepted by Charlie'),
(2, 'You have a new task request from Diana'),
(3, 'You have been rated 5 stars for your work on Alice’s task.');
