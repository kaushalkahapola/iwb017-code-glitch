import ballerina/sql;

function getUsers() returns User[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users`;
    stream<User,error?> UserStream = dbClient->query(query);
    return from User user in UserStream select user;
}

function getUserById(int id) returns User|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users WHERE user_id = ${id}`;
    return dbClient->queryRow(query);
}


function createUser(CreateUserRequest user) returns sql:ExecutionResult|sql:Error {
    CreateUserRequest {username, email, location, bio, password_hash} = user;
    sql:ParameterizedQuery query = `INSERT INTO Users (username, email, location, bio, password_hash) VALUES (${username}, ${email}, ${location}, ${bio}, ${password_hash})`;
    return dbClient->execute(query);
}

function updateUser(UpdateUserRequest user, int user_id) returns sql:ExecutionResult|sql:Error {
    UpdateUserRequest {username, email, location, bio} = user;
    sql:ParameterizedQuery query = `UPDATE Users SET username = ${username}, email = ${email}, location = ${location}, bio = ${bio} WHERE user_id = ${user_id}`;
    return dbClient->execute(query);
}

function deleteUser(int user_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Users WHERE user_id = ${user_id}`;
    return dbClient->execute(query);
}
