import ballerina/sql;

// 1. Create a new rating
function createRating(CreateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
    CreateRatingRequest {task_id, rated_user, rating_value, feedback} = rating;
    sql:ParameterizedQuery query = `INSERT INTO Ratings (task_id, rated_user, rating_value, feedback) VALUES (${task_id}, ${rated_user}, ${rating_value}, ${feedback})`;
    return dbClient->execute(query);
}

// 2. Get ratings for a specific task (sorted by created_at, newest first)
function getRatingsByTaskId(int taskId) returns Rating[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Ratings WHERE task_id = ${taskId} ORDER BY created_at DESC`;
    stream<Rating, error?> ratingStream = dbClient->query(query);
    return from Rating rating in ratingStream select rating;
}

// 3. Get ratings by a specific user
function getRatingsByUserId(int userId) returns Rating[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Ratings WHERE rated_user = ${userId} ORDER BY created_at DESC`;
    stream<Rating, error?> ratingStream = dbClient->query(query);
    return from Rating rating in ratingStream select rating;
}

// 4. Update an existing rating
function updateRating(int ratingId, UpdateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
    UpdateRatingRequest {rating_value, feedback} = rating;
    sql:ParameterizedQuery query = `UPDATE Ratings SET rating_value = ${rating_value}, feedback = ${feedback} WHERE rating_id = ${ratingId}`;
    return dbClient->execute(query);
}

// 5. Delete a rating
function deleteRating(int ratingId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Ratings WHERE rating_id = ${ratingId}`;
    return dbClient->execute(query);
}

// 6. Get average rating for a specific task
function getAverageRatingByTaskId(int taskId) returns decimal|error {
    sql:ParameterizedQuery query = `SELECT AVG(rating_value) AS average_rating FROM Ratings WHERE task_id = ${taskId}`;
    return dbClient->queryRow(query);
}
