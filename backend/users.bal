import ballerina/sql;

function getUsers() returns User[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users`;
    stream<User,error?> UserStream = dbClient->query(query);
    return from User user in UserStream select user;
}