import ballerinax/mysql;
import ballerina/sql;

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;
configurable mysql:Options & readonly connectionOptions = {};

mysql:Client dbClient = check new(
    host = host,
    port = port,
    user = user,
    password = password,
    database = database,
    options = connectionOptions
);

function getUsers() returns User[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Users`;
    stream<User,error?> UserStream = dbClient->query(query);
    return from User user in UserStream select user;
}