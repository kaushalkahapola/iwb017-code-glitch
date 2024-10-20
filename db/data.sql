-- Insert mock users
INSERT INTO Users (username, email, password_hash, location, bio, rating)
VALUES 
('Alice', 'alice@example.com', 'hashedpassword1', 'New York', 'Love helping others', 4.5),
('Bob', 'bob@example.com', 'hashedpassword2', 'Los Angeles', 'Skilled in electronics', 4.0),
('Charlie', 'charlie@example.com', 'hashedpassword3', 'Chicago', 'Enjoys fixing things', 3.8),
('Diana', 'diana@example.com', 'hashedpassword4', 'Miami', 'Excellent at organizing', 4.2),
('Eve', 'eve@example.com', 'hashedpassword5', 'San Francisco', 'Passionate about coding', 4.7),
('Frank', 'frank@example.com', 'hashedpassword6', 'Seattle', 'Loves DIY projects', 4.1),
('Grace', 'grace@example.com', 'hashedpassword7', 'Austin', 'Avid gardener and organizer', 4.3),
('Heidi', 'heidi@example.com', 'hashedpassword8', 'Boston', 'Tech enthusiast and volunteer', 4.6),
('Ivy', 'ivy@example.com', 'hashedpassword9', 'Denver', 'Enjoys hiking and community work', 4.4),
('Jake', 'jake@example.com', 'hashedpassword10', 'Portland', 'Loves to paint and create art', 4.2),
('Liam', 'liam@example.com', 'hashedpassword11', 'Phoenix', 'Enjoys building furniture', 4.5),
('Mia', 'mia@example.com', 'hashedpassword12', 'Dallas', 'Creative writer and artist', 4.3),
('Noah', 'noah@example.com', 'hashedpassword13', 'Austin', 'Tech geek and gadget lover', 4.8),
('Olivia', 'olivia@example.com', 'hashedpassword14', 'Las Vegas', 'Loves photography and travel', 4.0),
('Parker', 'parker@example.com', 'hashedpassword15', 'Philadelphia', 'Aspiring musician and singer', 4.6),
('Quinn', 'quinn@example.com', 'hashedpassword16', 'San Diego', 'Fitness enthusiast and coach', 4.1),
('Riley', 'riley@example.com', 'hashedpassword17', 'Houston', 'Foodie and cooking expert', 4.2),
('Sophie', 'sophie@example.com', 'hashedpassword18', 'Atlanta', 'Passionate about animal welfare', 4.4),
('Tyler', 'tyler@example.com', 'hashedpassword19', 'Seattle', 'Tech entrepreneur', 4.5),
('Uma', 'uma@example.com', 'hashedpassword20', 'Boston', 'Environmental activist', 4.3);

-- Insert mock communities
INSERT INTO Communities (name, description, location, created_by)
VALUES 
('Green Volunteers', 'A community focused on eco-friendly activities', 'New York', 1),
('Tech Helpers', 'A group for people interested in fixing and building tech gadgets', 'Los Angeles', 2),
('Art Enthusiasts', 'A space for artists to share and collaborate', 'Chicago', 3),
('Garden Lovers', 'Connect with fellow gardeners and share tips', 'Austin', 4),
('DIY Enthusiasts', 'Share your DIY projects and get advice from others', 'Seattle', 5),
('Foodies United', 'For those who love cooking and sharing recipes', 'Miami', 6),
('Fitness Fanatics', 'A group for fitness enthusiasts to share tips and motivate each other', 'Dallas', 7),
('Music Makers', 'Connect with musicians and share your work', 'San Francisco', 8),
('Writers Corner', 'A space for writers to share and critique each other’s work', 'Boston', 9),
('Tech Innovators', 'For those passionate about technology and innovation', 'Philadelphia', 10),
('Adventure Seekers', 'A community for travel and adventure enthusiasts', 'Las Vegas', 11),
('Pet Lovers', 'A group for pet owners to share tips and experiences', 'Denver', 12),
('Photography Club', 'Share your photography and get feedback', 'San Diego', 13),
('Hikers Unite', 'Plan hiking trips and share trails', 'Seattle', 14),
('Local Artists', 'Promote local artists and their work', 'Atlanta', 15),
('Environmental Advocates', 'Discuss and promote sustainability practices', 'Houston', 16),
('Gadget Geeks', 'A group for tech enthusiasts to discuss the latest gadgets', 'Phoenix', 17),
('Craft Creators', 'Share your crafting projects and get inspiration', 'Austin', 18),
('History Buffs', 'A community for those passionate about history', 'Chicago', 19),
('Fashion Enthusiasts', 'For those interested in fashion and style', 'Miami', 20);

-- Insert mock tasks
INSERT INTO Tasks (title, description, posted_by, offered_task, status, community_id)
VALUES 
('Fix my bicycle', 'Need someone to repair a flat tire', 1, 'Help with moving boxes', 'Open', 1),
('Organize a garage sale', 'Need help setting up tables and organizing items', 4, 'Assist with tech setup', 'Open', 1),
('Create a mural', 'Looking for someone to help paint a mural', 10, 'Help with furniture design', 'Open', 3),
('Build a website', 'Need help creating a personal website', 5, 'Help with coding projects', 'Open', 2),
('Plan a community picnic', 'Help organize a picnic for the community', 7, 'Assist with event planning', 'Open', 1),
('Set up a home network', 'Need help setting up a secure Wi-Fi network', 2, 'Free home-baked cookies', 'Open', 2),
('Build a custom table', 'Need assistance in making a dining table', 11, 'Provide artistic decor', 'Open', 4),
('Help with DIY project', 'Looking for someone skilled in woodworking', 6, 'Assist with garden planting', 'Open', 5),
('Photography session', 'Looking for a photographer for an event', 13, 'Provide snacks and drinks', 'Open', 12),
('Cooking class', 'Need help organizing a cooking class', 18, 'Assist with recipes', 'Open', 6),
('Tech consultation', 'Offer advice on building a PC', 8, 'Free tech gadgets', 'Open', 10),
('Fitness training', 'Looking for a personal trainer', 15, 'Help with meal prep', 'Open', 7),
('Pet sitting', 'Need someone to take care of my dog', 16, 'Walk my dog in return', 'Open', 12),
('Art critique', 'Looking for feedback on my painting', 10, 'Help with writing', 'Open', 3),
('Travel planning', 'Need assistance planning a trip', 11, 'Share travel tips', 'Open', 11),
('Create a blog', 'Help me set up a blog', 9, 'Assist with design', 'Open', 2),
('Gardening help', 'Looking for someone to help with my garden', 4, 'Provide fresh veggies', 'Open', 4),
('Musical collaboration', 'Seeking a partner to write music', 14, 'Share my songs', 'Open', 8),
('History presentation', 'Need help preparing a presentation', 19, 'Help with research', 'Open', 16),
('Fashion advice', 'Looking for styling tips', 20, 'Assist with sewing', 'Open', 18);

-- Insert mock community memberships
INSERT INTO CommunityMembers (community_id, user_id, joined_at)
VALUES 
(1, 1, CURRENT_TIMESTAMP),
(1, 4, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP),
(2, 5, CURRENT_TIMESTAMP),
(3, 3, CURRENT_TIMESTAMP),
(3, 10, CURRENT_TIMESTAMP),
(4, 4, CURRENT_TIMESTAMP),
(4, 6, CURRENT_TIMESTAMP),
(5, 5, CURRENT_TIMESTAMP),
(5, 11, CURRENT_TIMESTAMP),
(6, 6, CURRENT_TIMESTAMP),
(6, 18, CURRENT_TIMESTAMP),
(7, 7, CURRENT_TIMESTAMP),
(7, 15, CURRENT_TIMESTAMP),
(8, 8, CURRENT_TIMESTAMP),
(8, 14, CURRENT_TIMESTAMP),
(9, 9, CURRENT_TIMESTAMP),
(9, 19, CURRENT_TIMESTAMP),
(10, 10, CURRENT_TIMESTAMP),
(10, 20, CURRENT_TIMESTAMP),
(11, 11, CURRENT_TIMESTAMP);

-- Insert mock task swaps
INSERT INTO TaskSwaps (task_id, offered_by, accepted_by)
VALUES 
(1, 1, 3),  -- Alice offers to fix Bob’s bicycle
(2, 4, 1),  -- Diana offers to help Alice organize a garage sale
(3, 10, NULL),  -- Jake offers to help create a mural
(4, 5, NULL),  -- Eve offers to help build a website
(5, 7, 1),  -- Grace offers to help plan the picnic
(6, 2, NULL),  -- Bob offers to assist in setting up a home network
(7, 11, NULL),  -- Liam offers to assist in building a custom table
(8, 6, 2),  -- Frank offers to help with a DIY project
(9, 13, NULL),  -- Mia offers to provide a photography session
(10, 18, NULL),  -- Sophie offers to organize a cooking class
(11, 8, 4),  -- Heidi offers tech consultation to Alice
(12, 15, NULL),  -- Parker offers personal training
(13, 16, 11),  -- Olivia offers pet sitting
(14, 10, 3),  -- Jake offers art critique to Charlie
(15, 14, NULL),  -- Noah offers musical collaboration
(16, 19, NULL),  -- Uma offers assistance with a history presentation
(17, 20, NULL),  -- Tyler offers fashion advice
(18, 12, 6),  -- Ivy offers cooking class assistance
(19, 1, NULL),  -- Alice offers to help with a DIY project
(20, 5, 3);  -- Eve offers to assist in building a website

-- Insert mock ratings
INSERT INTO Ratings (task_id, rated_user, rating_value, feedback)
VALUES 
(1, 3, 5, 'Did a great job fixing my bike!'),
(2, 1, 4, 'Organized everything efficiently!'),
(3, NULL, 0, 'No rating yet, task not completed.'),
(4, NULL, 0, 'No rating yet, task not accepted.'),
(5, 1, 5, 'Excellent planning for the picnic!'),
(6, 2, 4, 'Great help with the Wi-Fi setup!'),
(7, NULL, 0, 'No rating yet, task not completed.'),
(8, 5, 5, 'Awesome DIY help!'),
(9, NULL, 0, 'No rating yet, task not completed.'),
(10, NULL, 0, 'No rating yet, task not accepted.'),
(11, 4, 5, 'Great advice on tech!'),
(12, 15, 5, 'Fantastic fitness training!'),
(13, 11, 5, 'Excellent care of my dog!'),
(14, 3, 4, 'Great feedback on my painting!'),
(15, NULL, 0, 'No rating yet, task not accepted.'),
(16, NULL, 0, 'No rating yet, task not accepted.'),
(17, NULL, 0, 'No rating yet, task not accepted.'),
(18, NULL, 0, 'No rating yet, task not completed.'),
(19, NULL, 0, 'No rating yet, task not accepted.'),
(20, NULL, 0, 'No rating yet, task not accepted.');

-- Insert mock notifications (optional)
INSERT INTO Notifications (user_id, message)
VALUES 
(1, 'Your task has been accepted by Charlie'),
(2, 'You have a new task request from Diana'),
(3, 'You have been rated 5 stars for your work on Alice’s task.'),
(4, 'Your task has been accepted by Jake'),
(5, 'You have a new task request for website building'),
(6, 'Your DIY project task has been accepted!'),
(7, 'You have a new cooking class request!'),
(8, 'Your tech consultation has been accepted by Alice.'),
(9, 'You have a new task request for photography!'),
(10, 'Your mural task is open for requests!'),
(11, 'Your pet sitting task has been accepted!'),
(12, 'You have a new task request for fitness training!'),
(13, 'You received a new request for DIY help!'),
(14, 'Your musical collaboration task is now open!'),
(15, 'You have a new task request for travel planning!'),
(16, 'You have a new request for your cooking class!'),
(17, 'Your gardening task has been accepted!'),
(18, 'You have a new art critique request!'),
(19, 'You received feedback on your task!'),
(20, 'Your history presentation task has been accepted!');
