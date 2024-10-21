import ballerinax/mysql;

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

public function getDbClient() returns mysql:Client {
    return dbClient;
}