import ballerina/time;
import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

public type User record {|
    int user_id;
    string username;
    string email;
    string password_hash;
    string location;
    string bio;
    decimal rating;
    time:Utc created_at;
|};

public type CreateUserRequest record {|
    string username;
    string email;
    string password_hash;
    string location;
    string bio;
|};

public type UpdateUserRequest record {|
    string username;
    string email;
    string location;
    string bio;
|};


public function getUsers() returns User[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users`;
    stream<User,error?> UserStream = dbClient->query(query);
    return from User user in UserStream select user;
}

public function getUserById(int id) returns User|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users WHERE user_id = ${id}`;
    return dbClient->queryRow(query);
}


public function createUser(CreateUserRequest user) returns sql:ExecutionResult|sql:Error {
    CreateUserRequest {username, email, location, bio, password_hash} = user;
    sql:ParameterizedQuery query = `INSERT INTO Users (username, email, location, bio, password_hash) VALUES (${username}, ${email}, ${location}, ${bio}, ${password_hash})`;
    return dbClient->execute(query);
}

public function updateUser(UpdateUserRequest user, int user_id) returns sql:ExecutionResult|sql:Error {
    UpdateUserRequest {username, email, location, bio} = user;
    sql:ParameterizedQuery query = `UPDATE Users SET username = ${username}, email = ${email}, location = ${location}, bio = ${bio} WHERE user_id = ${user_id}`;
    return dbClient->execute(query);
}

public function deleteUser(int user_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Users WHERE user_id = ${user_id}`;
    return dbClient->execute(query);
}
