import ballerina/time;

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
